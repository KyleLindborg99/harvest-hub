const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');
const { getWelcomeTemplate, getTrialEndingTemplate, getOrderConfirmationTemplate } = require('./email-templates');

// Inline EmailService to avoid import issues with Netlify Functions
class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
    }

    async sendEmail({ to, subject, html, from }) {
        try {
            const mailOptions = {
                from: from || `HarvestHub <${process.env.GMAIL_USER}>`,
                to,
                subject,
                html
            };

            const result = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', result.messageId);
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Email send failed:', error);
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }

    async sendWelcomeEmail(email, firstName, membershipType) {
        const subject = `Welcome to HarvestHub${membershipType === 'trial' ? ' - Free Trial Started!' : '!'}`;
        const html = getWelcomeTemplate(firstName, membershipType);
        return await this.sendEmail({ to: email, subject, html });
    }

    async sendTrialEndingEmail(email, firstName, trialEndDate) {
        const subject = 'Your HarvestHub Trial Ends Soon';
        const html = getTrialEndingTemplate(firstName, trialEndDate);
        return await this.sendEmail({ to: email, subject, html });
    }

    async sendOrderConfirmationEmail(email, firstName, orderDetails) {
        const subject = 'Order Confirmed!';
        const html = getOrderConfirmationTemplate(firstName, orderDetails);
        return await this.sendEmail({ to: email, subject, html });
    }
}

// Test function to verify email setup works
exports.handler = async (event, context) => {
    console.log('Testing email service...');
    
    try {
        const emailService = new EmailService();
        
        // Extract test parameters from query string or use defaults
        const { email, type = 'welcome' } = event.queryStringParameters || {};
        
        if (!email) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Email parameter required',
                    usage: 'GET /test-email?email=test@example.com&type=welcome'
                })
            };
        }

        let result;
        
        switch (type) {
            case 'welcome':
                result = await emailService.sendWelcomeEmail(email, 'Test User', 'trial');
                break;
            case 'trial-ending':
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 3);
                result = await emailService.sendTrialEndingEmail(email, 'Test User', futureDate.toISOString().split('T')[0]);
                break;
            case 'order-confirmation':
                const orderDetails = {
                    shareType: 'weekly',
                    shareSize: 'regular',
                    quantity: 1,
                    deliveryDate: '2025-01-30'
                };
                result = await emailService.sendOrderConfirmationEmail(email, 'Test User', orderDetails);
                break;
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        error: 'Invalid email type',
                        validTypes: ['welcome', 'trial-ending', 'order-confirmation']
                    })
                };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Test ${type} email sent successfully`,
                result,
                timestamp: new Date().toISOString()
            })
        };
    } catch (error) {
        console.error('Test email failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to send test email',
                details: error.message
            })
        };
    }
};