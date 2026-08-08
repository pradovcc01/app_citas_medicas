import { Button } from '@/shared/components/ui/Button'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useLogout } from '@/features/auth/hooks/useLogin'
import { useNavigate } from 'react-router-dom'

export function DashboardHeader() {
  const { user } = useAuth()
  const logout = useLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => navigate('/login'),
    })
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
            MediCitas
          </p>
          <h1 className="text-lg font-bold text-neutral-900 sm:text-xl">
            Hola, {user?.fullName ?? 'Paciente'}
          </h1>
          <p className="text-sm text-neutral-500">{user?.email}</p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleLogout}
          isLoading={logout.isPending}
        >
          Cerrar sesión
        </Button>
      </div>
    </header>
  )
}
