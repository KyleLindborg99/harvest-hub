// Domain Models - Core business entities
import { LeadType } from '../../config/leadTypes';

// Re-export for convenience
export { LeadType };

export interface Lead {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone?: string;
    readonly notes?: string;
    readonly type: LeadType;
    readonly createdAt: Date;
}

export interface LeadFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    notes?: string;
}

// Value Objects
export class Email {
    private readonly value: string;

    constructor(email: string) {
        if (!this.isValid(email)) {
            throw new Error('Invalid email format');
        }
        this.value = email;
    }

    private isValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    toString(): string {
        return this.value;
    }
}

export class LeadId {
    private readonly value: string;

    constructor(email: string, type: LeadType) {
        this.value = `${email}_${type}`;
    }

    toString(): string {
        return this.value;
    }
}