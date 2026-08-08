import { useState, type FormEvent } from 'react'
import { Input } from '@/shared/components/ui/Input'
import { Button } from '@/shared/components/ui/Button'
import { useDoctors } from '@/features/appointments/hooks/useAppointments'
import { useCreateAppointment } from '@/features/appointments/hooks/useCreateAppointment'

interface CreateAppointmentFormProps {
  patientId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function CreateAppointmentForm({
  patientId,
  onSuccess,
  onCancel,
}: CreateAppointmentFormProps) {
  const { data: doctors, isLoading: loadingDoctors } = useDoctors()
  const createAppointment = useCreateAppointment(patientId)

  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    createAppointment.mutate(
      { doctorId, date, time, reason },
      {
        onSuccess: () => {
          setDoctorId('')
          setDate('')
          setTime('')
          setReason('')
          onSuccess?.()
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="doctorId" className="text-sm font-medium text-neutral-700">
          Médico
        </label>
        <select
          id="doctorId"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
          disabled={loadingDoctors}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          <option value="">Selecciona un médico</option>
          {doctors?.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.fullName} — {doctor.specialty}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Fecha"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Input
          label="Hora"
          name="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reason" className="text-sm font-medium text-neutral-700">
          Motivo de la consulta
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          rows={3}
          placeholder="Describe brevemente el motivo de tu cita"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>

      {createAppointment.isError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {createAppointment.error instanceof Error
            ? createAppointment.error.message
            : 'No se pudo crear la cita'}
        </p>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" isLoading={createAppointment.isPending}>
          Agendar cita
        </Button>
      </div>
    </form>
  )
}
