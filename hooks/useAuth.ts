// hooks/useAuth.ts
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const login = () => {
    router.push('/api/auth/login');
  };

  const signup = () => {
    router.push('/api/auth/login?screen_hint=signup');
  };

  const logout = () => {
    router.push('/api/auth/logout');
  };

  return {
    user,
    error,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };
}