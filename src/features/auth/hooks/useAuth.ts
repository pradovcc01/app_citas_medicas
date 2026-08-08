import { useQuery } from '@tanstack/react-query'
import { authApi } from '@/features/auth/api/authApi'

export function useAuth() {
  const sessionQuery = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: () => authApi.getSession(),
    staleTime: Infinity,
  })

  return {
    session: sessionQuery.data ?? null,
    user: sessionQuery.data?.user ?? null,
    isAuthenticated: Boolean(sessionQuery.data),
    isLoading: sessionQuery.isLoading,
  }
}
