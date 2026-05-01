import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Variáveis do Supabase não configuradas. O sistema continuará usando localStorage para demonstração até que o banco seja conectado.');
}

export const supabase = createClient(
  supabaseUrl || 'https://ugppkllaeoewpkhklfry.supabase.co', 
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncHBrbGxhZW9ld3BraGtsZnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NjM5NDQsImV4cCI6MjA5MzEzOTk0NH0.zRW0ghLFrOVVUS0rrA0mkQc39b_tO40a5rSqylVYe1I'
);
