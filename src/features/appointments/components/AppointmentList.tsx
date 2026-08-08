import type { Appointment } from '@/types'
import { AppointmentCard } from '@/features/appointments/components/AppointmentCard'
import { EmptyState } from '@/shared/components/ui/EmptyState'
import { Spinner } from '@/shared/components/ui/Spinner'

interface AppointmentListProps {
  appointments: Appointment[] | undefined
  isLoading: boolean
}

export function AppointmentList({
  appointments,
  isLoading,
}: AppointmentListProps) {
  if (isLoading) {
    return <Spinner label="Cargando citas..." />
  }

  if (!appointments?.length) {
    return (
      <EmptyState
        title="No tienes citas registradas"
        description="Agenda tu primera cita usando el botón de arriba."
      />
    )
  }

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  )
}
