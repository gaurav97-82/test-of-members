import { supabase } from "@/integrations/client.ts";
import { User, Session } from '@supabase/supabase-js';
import { Database } from '@/integrations/types';

export type { User, Session, Database };

export { supabase };

// Create a function to check the current session
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
