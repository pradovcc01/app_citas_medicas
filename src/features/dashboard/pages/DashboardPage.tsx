import { Navigate } from 'react-router-dom'
import { PatientDashboard } from '@/features/dashboard/components/PatientDashboard'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Spinner } from '@/shared/components/ui/Spinner'

export function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <PatientDashboard />
}
