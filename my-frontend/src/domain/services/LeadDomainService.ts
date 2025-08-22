// Domain Service - Pure business logic
import { type LeadFormData, type LeadType, Email } from '../models/Lead';
import { type ILeadRepository } from '../repositories/ILeadRepository';

export class LeadDomainService {
    private readonly leadRepository: ILeadRepository
    constructor(leadRepository: ILeadRepository) {
        this.leadRepository = leadRepository;
    }

    async createLead(formData: LeadFormData, type: LeadType): Promise<void> {
        // Validate form data first
        this.validateLeadData(formData);

        // Validate email
        const email = new Email(formData.email);

        // Check if lead already exists
        const exists = await this.leadRepository.exists(email.toString(), type);
        if (exists) {
            throw new Error(`A lead with email "${email.toString()}" and type "${type}" has already been submitted.`);
        }


        // Save through repository
        await this.leadRepository.save(formData, type);
    }

    private validateLeadData(formData: LeadFormData): void {
        if (!formData.firstName || !formData.firstName.trim()) {
            throw new Error('First name is required');
        }
        if (!formData.lastName || !formData.lastName.trim()) {
            throw new Error('Last name is required');
        }
        if (!formData.email || !formData.email.trim()) {
            throw new Error('Email is required');
        }
        // Email validation handled by Email value object
    }
}