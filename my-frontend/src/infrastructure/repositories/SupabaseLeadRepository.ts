// Infrastructure Layer - Supabase implementation
import { supabase } from "../../config/supabase";
import type { ILeadRepository } from "../../domain/repositories/ILeadRepository";
import type { Lead, LeadFormData, LeadType } from "../../domain/models/Lead";

export class SupabaseLeadRepository implements ILeadRepository {
    async save(leadData: LeadFormData, type: LeadType): Promise<void> {
        // Check if lead already exists
        console.log("Checking if lead exists:", leadData.email, type);
        const existingLead = await this.exists(leadData.email, type);
        console.log("Exists result:", existingLead);
        
        if (existingLead) {
            console.log("Updating existing lead");
            // Update existing lead - add more detailed logging
            const { data, error } = await supabase
                .from('leads')
                .update({
                    first_name: leadData.firstName,
                    last_name: leadData.lastName,
                    phone: leadData.phone || null,
                    notes: leadData.notes || null,
                })
                .eq('email', leadData.email)
                .eq('type', type)
                .select();

            console.log("Update result:", { data, error });

            if (error) {
                console.error("Supabase update error:", error);
                throw new Error(`Failed to update lead: ${error.message}`);
            }

            if (!data || data.length === 0) {
                console.warn("No records updated - this shouldn't happen after exists() returned true");
                // Still don't fail for user - lead was already in system
                return;
            }

            console.log("Successfully updated existing lead");
        } else {
            console.log("Inserting new lead");
            // Insert new lead
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
                console.error("Supabase insert error:", error);
                throw new Error(`Failed to save lead: ${error.message}`);
            }

            console.log("Successfully inserted new lead");
        }
    }

    async exists(email: string, type: LeadType): Promise<boolean> {
        console.log("exists() called with:", email, type);
        const { data, error } = await supabase
            .from('leads')
            .select('id')
            .eq('email', email)
            .eq('type', type)
            .limit(1);

        console.log("exists() query result:", { data, error });

        if (error) {
            console.error("Supabase error:", error);
            throw new Error(`Failed to check if lead exists: ${error.message}`);
        }

        const result = data && data.length > 0;
        console.log("exists() returning:", result);
        return result;
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