import type { Appointment } from '@/types'
import { AppointmentStatusBadge } from '@/features/appointments/components/AppointmentStatusBadge'

interface AppointmentCardProps {
  appointment: Appointment
}

function formatDate(date: string, time: string) {
  const parsed = new Date(`${date}T${time}`)
  return parsed.toLocaleDateString('es-MX', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-neutral-900">
              {appointment.doctorName}
            </h3>
            <AppointmentStatusBadge status={appointment.status} />
          </div>
          <p className="text-sm text-primary-600">{appointment.specialty}</p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-sm font-medium text-neutral-900">
            {formatDate(appointment.date, appointment.time)}
          </p>
          <p className="text-sm text-neutral-500">{appointment.time} hrs</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-neutral-600 sm:grid-cols-2">
        <p>
          <span className="font-medium text-neutral-700">Motivo:</span>{' '}
          {appointment.reason}
        </p>
        <p>
          <span className="font-medium text-neutral-700">Ubicación:</span>{' '}
          {appointment.location}
        </p>
      </div>
    </article>
  )
}
