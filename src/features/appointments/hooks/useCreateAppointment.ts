import { useMutation, useQueryClient } from '@tanstack/react-query'
import { appointmentsApi } from '@/features/appointments/api/appointmentsApi'
import type { CreateAppointmentPayload } from '@/types'

export function useCreateAppointment(patientId: string | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) =>
      appointmentsApi.create(patientId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', patientId] })
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats', patientId] })
    },
  })
}
