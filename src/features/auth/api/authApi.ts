import type { LoginCredentials, AuthSession } from '@/types'
import { mockDb } from '@/mocks/db/mockDb'

export const authApi = {
  login: (credentials: LoginCredentials): Promise<AuthSession> =>
    mockDb.login(credentials),

  logout: (): Promise<void> => mockDb.logout(),

  getSession: (): AuthSession | null => mockDb.getSession(),
}
