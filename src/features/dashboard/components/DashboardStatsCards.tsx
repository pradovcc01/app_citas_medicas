import type { DashboardStats } from '@/types'
import { Card } from '@/shared/components/ui/Card'
import { AppointmentStatusBadge } from '@/features/appointments/components/AppointmentStatusBadge'

interface DashboardStatsCardsProps {
  stats: DashboardStats | undefined
  isLoading: boolean
}

const statItems = [
  { key: 'total', label: 'Total citas', color: 'text-neutral-900' },
  { key: 'pendiente', label: 'Pendientes', color: 'text-warning-700' },
  { key: 'confirmada', label: 'Confirmadas', color: 'text-success-700' },
  { key: 'completada', label: 'Completadas', color: 'text-neutral-700' },
] as const

export function DashboardStatsCards({
  stats,
  isLoading,
}: DashboardStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {statItems.map((item) => (
        <Card key={item.key} className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            {item.label}
          </p>
          <p className={`mt-2 text-2xl font-bold ${item.color}`}>
            {isLoading ? '—' : (stats?.[item.key] ?? 0)}
          </p>
        </Card>
      ))}
    </div>
  )
}

interface NextAppointmentProps {
  stats: DashboardStats | undefined
}

export function NextAppointmentCard({ stats }: NextAppointmentProps) {
  const next = stats?.nextAppointment

  if (!next) {
    return (
      <Card title="Próxima cita">
        <p className="text-sm text-neutral-500">
          No tienes citas próximas programadas.
        </p>
      </Card>
    )
  }

  return (
    <Card title="Próxima cita">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-neutral-900">{next.doctorName}</p>
          <p className="text-sm text-primary-600">{next.specialty}</p>
          <p className="mt-1 text-sm text-neutral-600">
            {next.date} · {next.time} hrs
          </p>
        </div>
        <AppointmentStatusBadge status={next.status} />
      </div>
    </Card>
  )
}
