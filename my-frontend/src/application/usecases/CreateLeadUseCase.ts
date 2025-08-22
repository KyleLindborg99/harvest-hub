// Application Layer - Use Cases (Orchestrates domain services)
import { LeadFormData, LeadType } from '../../domain/models/Lead';
import { LeadDomainService } from '../../domain/services/LeadDomainService';

export class CreateLeadUseCase {
    constructor(private readonly leadDomainService: LeadDomainService) {}

    async execute(formData: LeadFormData, type: LeadType): Promise<void> {
        try {
            await this.leadDomainService.createLead(formData, type);
        } catch (error) {
            // Log error for monitoring
            console.error('CreateLeadUseCase failed:', error);
            throw error; // Re-throw for UI handling
        }
    }
}