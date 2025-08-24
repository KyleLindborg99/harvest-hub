// Infrastructure Layer - Supabase implementation
import { supabase } from "../../config/supabase";
import type { ILeadRepository } from "../../domain/repositories/ILeadRepository";
import type { Lead, LeadFormData, LeadType } from "../../domain/models/Lead";

export class SupabaseLeadRepository implements ILeadRepository {
    async save(leadData: LeadFormData, type: LeadType): Promise<void> {
        // Simple insert - if duplicate exists, silently ignore (lead already captured)
        const { error } = await supabase
            .from('leads')
            .insert({
                email: leadData.email,
                first_name: leadData.firstName,
                last_name: leadData.lastName,
                phone: leadData.phone || null,
                notes: leadData.notes || null,
                type: type
            });

        if (error) {
            // If it's a duplicate key error, that's fine - lead already exists
            if (error.code === '23505' && error.message.includes('unique_email_type')) {
                console.log("Lead already exists for:", leadData.email, type);
                return; // Silently succeed
            }
            
            // For any other error, throw it
            console.error("Supabase insert error:", error);
            throw new Error(`Failed to save lead: ${error.message}`);
        }
    }

    async exists(email: string, type: LeadType): Promise<boolean> {
        const { data, error } = await supabase
            .from('leads')
            .select('id')
            .eq('email', email)
            .eq('type', type)
            .limit(1);

        if (error) {
            console.error("Supabase error:", error);
            throw new Error(`Failed to check if lead exists: ${error.message}`);
        }

        return data && data.length > 0;
    }

    async findById(id: string): Promise<Lead | null> {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No rows returned
                return null;
            }
            console.error("Supabase error:", error);
            throw new Error(`Failed to find lead: ${error.message}`);
        }

        if (!data) return null;

        // Transform Supabase data to domain model
        return {
            id: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            phone: data.phone,
            notes: data.notes,
            type: data.type,
            createdAt: new Date(data.created_at)
        };
    }
}