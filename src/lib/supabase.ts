import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Variáveis do Supabase não configuradas. O sistema continuará usando localStorage para demonstração até que o banco seja conectado.');
}

export const supabase = createClient(
  supabaseUrl || 'https://ugppkllaeoewpkhklfry.supabase.co', 
  supabaseAnonKey || 'sb_publishable_2vc8qqRZHtW-tylFOwHqDw_QVkHPqTa'
);
