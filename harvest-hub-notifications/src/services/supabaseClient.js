const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://uzqbsotbrwoactrcgooz.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6cWJzb3RicndvYWN0cmNnb296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4OTgzMzcsImV4cCI6MjA3MTQ3NDMzN30.2vqMCVWESqtu2_AQyQ_XlVmKQglYjFCk4qfxDvRyy3Y';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };