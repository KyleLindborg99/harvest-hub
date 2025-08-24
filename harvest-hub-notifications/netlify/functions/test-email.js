const EmailService = require('../../src/services/emailService');

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