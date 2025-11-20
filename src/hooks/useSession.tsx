import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to access the current user session
 * Returns the session object and loading state
 */
export function useSession() {
  const { session, loading } = useAuth();
  
  return { session, loading };
}
