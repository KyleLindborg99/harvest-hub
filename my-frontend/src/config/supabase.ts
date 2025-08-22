import { createClient } from '@supabase/supabase-js'

// Supabase project configuration
const supabaseUrl = 'https://uzqbsotbrwoactrcgooz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6cWJzb3RicndvYWN0cmNnb296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4OTgzMzcsImV4cCI6MjA3MTQ3NDMzN30.2vqMCVWESqtu2_AQyQ_XlVmKQglYjFCk4qfxDvRyy3Y'

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (we'll update these based on your actual schema)
export interface Lead {
  id?: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  notes?: string
  type: 'share' | 'member'
  created_at?: string
}

// Lead form data type (for form handling)
export interface LeadFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  notes?: string
}

export type LeadType = 'share' | 'member'