// Component to protect routes. 
// If the user is not logged in, redirect them to the home page ('/').
import { useRouter } from '@/hooks/useRouter';
import { useSession } from '@/hooks/useSession';
import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const { session, loading } = useSession();

  // If loading, show a spinner. If no session, redirect.
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!session) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
