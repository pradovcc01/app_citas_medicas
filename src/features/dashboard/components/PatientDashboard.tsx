import { useState } from 'react'
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader'
import {
  DashboardStatsCards,
  NextAppointmentCard,
} from '@/features/dashboard/components/DashboardStatsCards'
import { AppointmentList } from '@/features/appointments/components/AppointmentList'
import { CreateAppointmentForm } from '@/features/appointments/components/CreateAppointmentForm'
import { Card } from '@/shared/components/ui/Card'
import { Button } from '@/shared/components/ui/Button'
import { useAuth } from '@/features/auth/hooks/useAuth'
import {
  useAppointments,
  useDashboardStats,
} from '@/features/appointments/hooks/useAppointments'

export function PatientDashboard() {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)

  const { data: appointments, isLoading: loadingAppointments } =
    useAppointments(user?.id)
  const { data: stats, isLoading: loadingStats } = useDashboardStats(user?.id)

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <section>
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Resumen de citas
          </h2>
          <DashboardStatsCards stats={stats} isLoading={loadingStats} />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card
              title="Mis citas"
              action={
                <Button size="sm" onClick={() => setShowForm((v) => !v)}>
                  {showForm ? 'Ocultar formulario' : 'Nueva cita'}
                </Button>
              }
            >
              {showForm && (
                <div className="mb-6 rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <CreateAppointmentForm
                    patientId={user.id}
                    onSuccess={() => setShowForm(false)}
                    onCancel={() => setShowForm(false)}
                  />
                </div>
              )}

              <AppointmentList
                appointments={appointments}
                isLoading={loadingAppointments}
              />
            </Card>
          </div>

          <div>
            <NextAppointmentCard stats={stats} />
          </div>
        </section>
      </main>
    </div>
  )
}
