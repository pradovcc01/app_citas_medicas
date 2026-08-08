import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/features/auth/api/authApi'
import type { LoginCredentials } from '@/types'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (session) => {
      queryClient.setQueryData(['auth', 'session'], session)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'session'], null)
      queryClient.removeQueries({ queryKey: ['appointments'] })
      queryClient.removeQueries({ queryKey: ['dashboard'] })
    },
  })
}
