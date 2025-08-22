// Simple QR Code generator for demo
// Run with: node generate-qr-codes.js

const base_url = 'https://harvesthub-ed691.web.app';

const qr_urls = {
    share: `${base_url}/form/sh7x9m2k4p`,
    membership: `${base_url}/form/mb3n8q5w1z`
};

console.log('QR Code URLs for your demo:\n');
console.log('Share Form QR Code:');
console.log(`URL: ${qr_urls.share}`);
console.log(`QR Code Generator: https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr_urls.share)}\n`);

console.log('Membership Form QR Code:');
console.log(`URL: ${qr_urls.membership}`);
console.log(`QR Code Generator: https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr_urls.membership)}\n`);

console.log('You can download these QR codes by visiting the URLs above, or use any QR code generator with the form URLs.');