import { useNavigate } from 'react-router-dom';

/**
 * Custom hook that provides a router interface similar to Next.js
 * This wraps react-router-dom's useNavigate for consistency
 */
export function useRouter() {
  const navigate = useNavigate();
  
  return {
    push: (path: string) => navigate(path),
    replace: (path: string) => navigate(path, { replace: true }),
  };
}
