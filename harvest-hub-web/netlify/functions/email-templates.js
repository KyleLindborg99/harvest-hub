// Email Templates - Ready for Designer Handoff
// 
// INSTRUCTIONS FOR DESIGNER:
// 1. Each template has clearly marked sections for easy customization
// 2. Brand colors: Primary #4CAF50 (green), Warning #FF9800 (orange)
// 3. All templates are responsive and work across email clients
// 4. Template variables are marked with ${variable} - preserve these exactly
// 5. Update styling within the existing structure for consistency

/**
 * Welcome Email Template
 * Use Cases: New trial members, new regular members
 * Variables: firstName, membershipType
 */
function getWelcomeTemplate(firstName, membershipType) {
    const isTrialUser = membershipType === 'trial';
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to HarvestHub</title>
        </head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <!-- Header -->
            <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #4CAF50;">
                <h1 style="color: #4CAF50; margin: 0;">🌱 HarvestHub</h1>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 30px 0;">
                <h2 style="color: #4CAF50;">Welcome to HarvestHub, ${firstName}!</h2>
                <p style="font-size: 16px;">We're excited to have you join our community of local food lovers.</p>
                
                ${isTrialUser ? `
                    <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #4CAF50; margin: 20px 0;">
                        <h3 style="color: #2e7d32; margin-top: 0;">🎉 Your free trial has started!</h3>
                        <p>You can explore all our membership benefits for the next 14 days.</p>
                    </div>
                ` : `
                    <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2e7d32; margin-top: 0;">Thank you for becoming a member!</h3>
                        <p>Your HarvestHub membership is now active.</p>
                    </div>
                `}
                
                <!-- What's Next Section -->
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
                    <ul style="padding-left: 20px;">
                        <li>🥕 Browse our weekly share options</li>
                        <li>📍 Set your delivery preferences</li>
                        <li>👨‍🌾 Connect with local farmers</li>
                    </ul>
                </div>
                
                <p>Questions? Simply reply to this email or visit our website.</p>
            </div>
            
            <!-- Footer -->
            <div style="border-top: 1px solid #eee; padding: 20px 0; text-align: center; color: #666; font-size: 14px;">
                <p>Happy harvesting! 🌾<br>
                <strong>The HarvestHub Team</strong></p>
                <p style="margin-top: 15px;">
                    <a href="https://harvest-hub-michigan.netlify.app" style="color: #4CAF50; text-decoration: none;">Visit HarvestHub</a>
                </p>
            </div>
            
        </body>
        </html>
    `;
}

/**
 * Trial Ending Reminder Template  
 * Use Cases: Trials ending in 0-5 days
 * Variables: firstName, trialEndDate
 */
function getTrialEndingTemplate(firstName, trialEndDate) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your HarvestHub Trial Ends Soon</title>
        </head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <!-- Header -->
            <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #FF9800;">
                <h1 style="color: #FF9800; margin: 0;">⏰ HarvestHub</h1>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 30px 0;">
                <h2 style="color: #FF9800;">Don't Miss Out, ${firstName}!</h2>
                <p style="font-size: 16px;">Your HarvestHub free trial ends on <strong>${trialEndDate}</strong>.</p>
                
                <!-- Benefits Section -->
                <div style="background: #fff3cd; padding: 25px; border-radius: 8px; border-left: 4px solid #FF9800; margin: 25px 0;">
                    <h3 style="color: #e65100; margin-top: 0;">Don't lose access to:</h3>
                    <ul style="padding-left: 20px; font-size: 15px;">
                        <li>🥬 Fresh, local produce shares</li>
                        <li>⭐ Priority ordering</li>
                        <li>🎪 Member-only events</li>
                        <li>👨‍🌾 Direct farmer connections</li>
                    </ul>
                </div>
                
                <!-- CTA Button -->
                <div style="text-align: center; margin: 40px 0;">
                    <a href="https://harvest-hub-michigan.netlify.app" 
                       style="background: #4CAF50; color: white; padding: 15px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                        Continue Your Membership →
                    </a>
                </div>
                
                <p>Have questions? We're here to help!</p>
            </div>
            
            <!-- Footer -->
            <div style="border-top: 1px solid #eee; padding: 20px 0; text-align: center; color: #666; font-size: 14px;">
                <p>Keep growing with us! 🌱<br>
                <strong>The HarvestHub Team</strong></p>
            </div>
            
        </body>
        </html>
    `;
}

/**
 * Order Confirmation Template
 * Use Cases: New share orders  
 * Variables: firstName, orderDetails {shareType, shareSize, quantity, deliveryDate}
 */
function getOrderConfirmationTemplate(firstName, orderDetails) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmed - HarvestHub</title>
        </head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <!-- Header -->
            <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #4CAF50;">
                <h1 style="color: #4CAF50; margin: 0;">✅ HarvestHub</h1>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 30px 0;">
                <h2 style="color: #4CAF50;">Order Confirmed!</h2>
                <p style="font-size: 16px;">Hi ${firstName},</p>
                <p>Great news! Your HarvestHub share order has been confirmed.</p>
                
                <!-- Order Details -->
                <div style="background: #f5f5f5; padding: 25px; border-radius: 8px; margin: 25px 0;">
                    <h3 style="color: #333; margin-top: 0;">📦 Order Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Share Type:</td>
                            <td style="padding: 8px 0;">${orderDetails.shareType}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Size:</td>
                            <td style="padding: 8px 0;">${orderDetails.shareSize || 'Regular'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Quantity:</td>
                            <td style="padding: 8px 0;">${orderDetails.quantity}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Delivery Date:</td>
                            <td style="padding: 8px 0;"><strong>${orderDetails.deliveryDate}</strong></td>
                        </tr>
                    </table>
                </div>
                
                <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0;">🚚 Your fresh, local produce will be ready for pickup/delivery on the scheduled date.</p>
                    <p style="margin: 10px 0 0 0;">We'll send you another notification when your share is ready!</p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="border-top: 1px solid #eee; padding: 20px 0; text-align: center; color: #666; font-size: 14px;">
                <p>Fresh food, fresh start! 🥕<br>
                <strong>The HarvestHub Team</strong></p>
            </div>
            
        </body>
        </html>
    `;
}

module.exports = {
    getWelcomeTemplate,
    getTrialEndingTemplate, 
    getOrderConfirmationTemplate
};