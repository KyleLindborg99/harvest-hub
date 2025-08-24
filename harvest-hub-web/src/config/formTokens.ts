// Secure tokens for form access
// These tokens should be random and unguessable
export const FORM_TOKENS = {
    // Share form token - use this in QR code: yoursite.com/f/sh7x9m2k4p
    share: 'sh7x9m2k4p',
    
    // Membership form token - use this in QR code: yoursite.com/f/mb3n8q5w1z
    membership: 'mb3n8q5w1z'
} as const;

// Reverse mapping for validation
export const TOKEN_TO_FORM_TYPE = {
    [FORM_TOKENS.share]: 'share',
    [FORM_TOKENS.membership]: 'member'
} as const;

// Type for valid tokens
export type FormToken = keyof typeof TOKEN_TO_FORM_TYPE;

// Validate if a token is valid and return the form type
export function validateFormToken(token: string): 'share' | 'member' | null {
    if (token in TOKEN_TO_FORM_TYPE) {
        return TOKEN_TO_FORM_TYPE[token as FormToken];
    }
    return null;
}

// Generate new random token (for future use)
export function generateToken(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}