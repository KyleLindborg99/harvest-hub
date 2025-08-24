const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

// Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL || 'https://uzqbsotbrwoactrcgooz.supabase.co',
    process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6cWJzb3RicndvYWN0cmNnb296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4OTgzMzcsImV4cCI6MjA3MTQ3NDMzN30.2vqMCVWESqtu2_AQyQ_XlVmKQglYjFCk4qfxDvRyy3Y'
);

// Inline EmailService
class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
    }

    async sendEmail({ to, subject, html, from }) {
        const mailOptions = {
            from: from || `HarvestHub <${process.env.GMAIL_USER}>`,
            to,
            subject,
            html
        };
        const result = await this.transporter.sendMail(mailOptions);
        return { success: true, messageId: result.messageId };
    }

    async sendWelcomeEmail(email, firstName, membershipType) {
        const subject = `Welcome to HarvestHub${membershipType === 'trial' ? ' - Free Trial Started!' : '!'}`;
        const html = `<div style="font-family: Arial, sans-serif;"><h2>Welcome ${firstName}!</h2><p>Thanks for joining HarvestHub!</p></div>`;
        return await this.sendEmail({ to: email, subject, html });
    }

    async sendTrialEndingEmail(email, firstName, trialEndDate) {
        const subject = 'Your HarvestHub Trial Ends Soon';
        const html = `<div style="font-family: Arial, sans-serif;"><h2>Hi ${firstName}</h2><p>Your trial ends ${trialEndDate}</p></div>`;
        return await this.sendEmail({ to: email, subject, html });
    }

    async sendOrderConfirmationEmail(email, firstName, orderDetails) {
        const subject = 'Order Confirmed!';
        const html = `<div style="font-family: Arial, sans-serif;"><h2>Hi ${firstName}</h2><p>Your ${orderDetails.shareType} order is confirmed!</p></div>`;
        return await this.sendEmail({ to: email, subject, html });
    }
}

// Main function to process all notification types
exports.handler = async (event, context) => {
    console.log('Starting notification processing...');
    
    try {
        const emailService = new EmailService();
        const results = {
            trialReminders: 0,
            welcomeEmails: 0,
            orderConfirmations: 0,
            errors: []
        };

        // Process trial ending reminders (3 days before expiration)
        await processTrialReminders(emailService, results);
        
        // Process welcome emails for new memberships (created in last 24 hours)
        await processWelcomeEmails(emailService, results);
        
        // Process order confirmations (new orders in last 24 hours)
        await processOrderConfirmations(emailService, results);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Notifications processed successfully',
                results
            })
        };
    } catch (error) {
        console.error('Error processing notifications:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to process notifications',
                details: error.message
            })
        };
    }
};

// Process trial ending reminders
async function processTrialReminders(emailService, results) {
    try {
        // Get memberships where trial ends in 3 days
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
        const targetDate = threeDaysFromNow.toISOString().split('T')[0];

        const { data: trialMembers, error } = await supabase
            .from('memberships')
            .select(`
                *,
                leads!inner(email, first_name)
            `)
            .eq('membership_type', 'trial')
            .eq('status', 'active')
            .eq('trial_end_date', targetDate);

        if (error) throw error;

        console.log(`Found ${trialMembers?.length || 0} trial members ending soon`);

        for (const member of trialMembers || []) {
            try {
                await emailService.sendTrialEndingEmail(
                    member.leads.email,
                    member.leads.first_name,
                    member.trial_end_date
                );
                results.trialReminders++;
                
                // Log that we sent this notification
                await logNotification(member.lead_id, 'trial_ending_reminder');
            } catch (error) {
                console.error(`Failed to send trial reminder to ${member.leads.email}:`, error);
                results.errors.push(`Trial reminder failed: ${error.message}`);
            }
        }
    } catch (error) {
        console.error('Error processing trial reminders:', error);
        results.errors.push(`Trial reminders failed: ${error.message}`);
    }
}

// Process welcome emails for new memberships
async function processWelcomeEmails(emailService, results) {
    try {
        // Get memberships created in the last 24 hours
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const { data: newMembers, error } = await supabase
            .from('memberships')
            .select(`
                *,
                leads!inner(email, first_name)
            `)
            .gte('created_at', yesterday.toISOString())
            .eq('status', 'active');

        if (error) throw error;

        console.log(`Found ${newMembers?.length || 0} new memberships`);

        for (const member of newMembers || []) {
            try {
                // Check if we already sent welcome email
                const alreadySent = await checkNotificationSent(member.lead_id, 'welcome');
                if (alreadySent) continue;

                await emailService.sendWelcomeEmail(
                    member.leads.email,
                    member.leads.first_name,
                    member.membership_type
                );
                results.welcomeEmails++;
                
                // Log that we sent this notification
                await logNotification(member.lead_id, 'welcome');
            } catch (error) {
                console.error(`Failed to send welcome email to ${member.leads.email}:`, error);
                results.errors.push(`Welcome email failed: ${error.message}`);
            }
        }
    } catch (error) {
        console.error('Error processing welcome emails:', error);
        results.errors.push(`Welcome emails failed: ${error.message}`);
    }
}

// Process order confirmations
async function processOrderConfirmations(emailService, results) {
    try {
        // Get orders created in the last 24 hours
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const { data: newOrders, error } = await supabase
            .from('share_orders')
            .select(`
                *,
                leads!inner(email, first_name)
            `)
            .gte('created_at', yesterday.toISOString())
            .eq('status', 'pending');

        if (error) throw error;

        console.log(`Found ${newOrders?.length || 0} new orders`);

        for (const order of newOrders || []) {
            try {
                // Check if we already sent confirmation email
                const alreadySent = await checkNotificationSent(order.lead_id, 'order_confirmation', order.id);
                if (alreadySent) continue;

                const orderDetails = {
                    shareType: order.share_type,
                    shareSize: order.share_size,
                    quantity: order.quantity,
                    deliveryDate: order.delivery_date
                };

                await emailService.sendOrderConfirmationEmail(
                    order.leads.email,
                    order.leads.first_name,
                    orderDetails
                );
                results.orderConfirmations++;
                
                // Log that we sent this notification
                await logNotification(order.lead_id, 'order_confirmation', order.id);
            } catch (error) {
                console.error(`Failed to send order confirmation to ${order.leads.email}:`, error);
                results.errors.push(`Order confirmation failed: ${error.message}`);
            }
        }
    } catch (error) {
        console.error('Error processing order confirmations:', error);
        results.errors.push(`Order confirmations failed: ${error.message}`);
    }
}

// Helper function to log sent notifications
async function logNotification(leadId, type, referenceId = null) {
    try {
        await supabase.from('email_notifications').insert({
            lead_id: leadId,
            notification_type: type,
            reference_id: referenceId,
            status: 'sent'
        });
    } catch (error) {
        console.error('Failed to log notification:', error);
    }
}

// Helper function to check if notification was already sent
async function checkNotificationSent(leadId, type, referenceId = null) {
    try {
        const query = supabase
            .from('email_notifications')
            .select('id')
            .eq('lead_id', leadId)
            .eq('notification_type', type)
            .eq('status', 'sent');
        
        if (referenceId) {
            query.eq('reference_id', referenceId);
        }

        const { data } = await query.limit(1);
        return data && data.length > 0;
    } catch (error) {
        console.error('Failed to check notification status:', error);
        return false;
    }
}