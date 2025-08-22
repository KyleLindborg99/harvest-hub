// Domain Service - Pure business logic
import { Lead, LeadFormData, LeadType, Email, LeadId } from '../models/Lead';
import { ILeadRepository } from '../repositories/ILeadRepository';

export class LeadDomainService {
    constructor(private readonly leadRepository: ILeadRepository) {}

    async createLead(formData: LeadFormData, type: LeadType): Promise<void> {
        // Validate email
        const email = new Email(formData.email);
        
        // Check if lead already exists
        const exists = await this.leadRepository.exists(email.toString(), type);
        if (exists) {
            throw new Error(`A lead with email "${email.toString()}" and type "${type}" has already been submitted.`);
        }

        // Create lead domain object
        const leadId = new LeadId(email.toString(), type);
        const lead: Lead = {
            id: leadId.toString(),
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: email.toString(),
            phone: formData.phone?.trim(),
            notes: formData.notes?.trim(),
            type,
            createdAt: new Date()
        };

        // Save through repository
        await this.leadRepository.save(formData, type);
    }

    private validateLeadData(formData: LeadFormData): void {
        if (!formData.firstName.trim()) {
            throw new Error('First name is required');
        }
        if (!formData.lastName.trim()) {
            throw new Error('Last name is required');
        }
        // Email validation handled by Email value object
    }
}