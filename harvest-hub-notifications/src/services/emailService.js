const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD // Gmail App Password (not regular password)
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
        const html = this.getWelcomeTemplate(firstName, membershipType);
        
        return await this.sendEmail({ to: email, subject, html });
    }

    async sendTrialEndingEmail(email, firstName, trialEndDate) {
        const subject = 'Your HarvestHub Trial is Ending Soon';
        const html = this.getTrialEndingTemplate(firstName, trialEndDate);
        
        return await this.sendEmail({ to: email, subject, html });
    }

    async sendOrderConfirmationEmail(email, firstName, orderDetails) {
        const subject = 'Your HarvestHub Share Order Confirmed';
        const html = this.getOrderConfirmationTemplate(firstName, orderDetails);
        
        return await this.sendEmail({ to: email, subject, html });
    }

    // Email templates (will move to separate template files later)
    getWelcomeTemplate(firstName, membershipType) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4CAF50;">Welcome to HarvestHub, ${firstName}!</h2>
                <p>We're excited to have you join our community of local food lovers.</p>
                
                ${membershipType === 'trial' ? 
                    '<p><strong>Your free trial has started!</strong> You can explore all our membership benefits for the next 14 days.</p>' :
                    '<p>Thank you for becoming a HarvestHub member. Your membership is now active!</p>'
                }
                
                <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3>What's Next?</h3>
                    <ul>
                        <li>Browse our weekly share options</li>
                        <li>Set your delivery preferences</li>
                        <li>Connect with local farmers</li>
                    </ul>
                </div>
                
                <p>Questions? Reply to this email or visit our website.</p>
                <p style="color: #666;">- The HarvestHub Team</p>
            </div>
        `;
    }

    getTrialEndingTemplate(firstName, trialEndDate) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #FF9800;">Your HarvestHub Trial Ends Soon</h2>
                <p>Hi ${firstName},</p>
                <p>Your HarvestHub free trial ends on <strong>${trialEndDate}</strong> (in 3 days).</p>
                
                <div style="background: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3>Don't lose access to:</h3>
                    <ul>
                        <li>Fresh, local produce shares</li>
                        <li>Priority ordering</li>
                        <li>Member-only events</li>
                        <li>Direct farmer connections</li>
                    </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://harvest-hub-michigan.netlify.app" 
                       style="background: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Continue Your Membership
                    </a>
                </div>
                
                <p>Have questions? We're here to help!</p>
                <p style="color: #666;">- The HarvestHub Team</p>
            </div>
        `;
    }

    getOrderConfirmationTemplate(firstName, orderDetails) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4CAF50;">Order Confirmed!</h2>
                <p>Hi ${firstName},</p>
                <p>Great news! Your HarvestHub share order has been confirmed.</p>
                
                <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3>Order Details</h3>
                    <p><strong>Share Type:</strong> ${orderDetails.shareType}</p>
                    <p><strong>Size:</strong> ${orderDetails.shareSize || 'Regular'}</p>
                    <p><strong>Quantity:</strong> ${orderDetails.quantity}</p>
                    <p><strong>Delivery Date:</strong> ${orderDetails.deliveryDate}</p>
                </div>
                
                <p>Your fresh, local produce will be ready for pickup/delivery on the scheduled date.</p>
                <p>We'll send you another notification when your share is ready!</p>
                
                <p style="color: #666;">- The HarvestHub Team</p>
            </div>
        `;
    }
}

module.exports = EmailService;