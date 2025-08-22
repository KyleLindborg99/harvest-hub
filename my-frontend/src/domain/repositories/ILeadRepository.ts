// Domain Repository Interface - No implementation details
import type { Lead, LeadFormData, LeadType } from '../models/Lead';

export interface ILeadRepository {
    save(leadData: LeadFormData, type: LeadType): Promise<void>;
    exists(email: string, type: LeadType): Promise<boolean>;
    findById(id: string): Promise<Lead | null>;
}

// Domain Events
export interface DomainEvent {
    readonly eventType: string;
    readonly occurredAt: Date;
    readonly aggregateId: string;
}

export class LeadCreatedEvent implements DomainEvent {
    readonly eventType = 'LeadCreated';
    readonly occurredAt: Date;
    readonly aggregateId: string;
    readonly leadData: Lead;

    constructor(lead: Lead) {
        this.occurredAt = new Date();
        this.aggregateId = lead.id;
        this.leadData = lead;
    }
}