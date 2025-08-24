// Infrastructure Layer - Supabase implementation
import { supabase } from "../../config/supabase";
import type { ILeadRepository } from "../../domain/repositories/ILeadRepository";
import type { Lead, LeadFormData, LeadType } from "../../domain/models/Lead";

export class SupabaseLeadRepository implements ILeadRepository {
    async save(leadData: LeadFormData, type: LeadType): Promise<void> {
        // Try insert first, handle duplicate key error by updating
        const { error: insertError } = await supabase
            .from('leads')
            .insert({
                email: leadData.email,
                first_name: leadData.firstName,
                last_name: leadData.lastName,
                phone: leadData.phone || null,
                notes: leadData.notes || null,
                type: type
            });

        if (insertError) {
            // Check if it's a duplicate key error
            if (insertError.code === '23505' && insertError.message.includes('unique_email_type')) {
                console.log("Duplicate found, updating existing lead");
                // Update existing lead
                const { error: updateError } = await supabase
                    .from('leads')
                    .update({
                        first_name: leadData.firstName,
                        last_name: leadData.lastName,
                        phone: leadData.phone || null,
                        notes: leadData.notes || null,
                    })
                    .eq('email', leadData.email)
                    .eq('type', type);

                if (updateError) {
                    console.error("Supabase update error:", updateError);
                    throw new Error(`Failed to update lead: ${updateError.message}`);
                }
            } else {
                // Some other error
                console.error("Supabase insert error:", insertError);
                throw new Error(`Failed to save lead: ${insertError.message}`);
            }
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