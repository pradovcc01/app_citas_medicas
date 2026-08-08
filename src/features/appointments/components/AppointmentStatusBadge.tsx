import type { AppointmentStatus } from '@/types'
import { cn } from '@/shared/lib/cn'

const statusConfig: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  pendiente: {
    label: 'Pendiente',
    className: 'bg-warning-100 text-warning-700',
  },
  confirmada: {
    label: 'Confirmada',
    className: 'bg-success-100 text-success-700',
  },
  cancelada: {
    label: 'Cancelada',
    className: 'bg-danger-100 text-danger-700',
  },
  completada: {
    label: 'Completada',
    className: 'bg-slate-100 text-neutral-700',
  },
}

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus
}

export function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        config.className,
      )}
    >
      {config.label}
    </span>
  )
}
