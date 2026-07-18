import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to the provided keys for immediate connection
const env = (import.meta as any).env;
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://epzfiabwelmcpdlnnpwu.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_KnNt3CWIV-MPKsWEciMZ1A_mEECIq1g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
