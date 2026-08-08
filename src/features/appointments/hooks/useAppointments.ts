import { useQuery } from '@tanstack/react-query'
import { appointmentsApi } from '@/features/appointments/api/appointmentsApi'

export function useAppointments(patientId: string | undefined) {
  return useQuery({
    queryKey: ['appointments', patientId],
    queryFn: () => appointmentsApi.getAll(patientId!),
    enabled: Boolean(patientId),
  })
}

export function useDoctors() {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: () => appointmentsApi.getDoctors(),
  })
}

export function useDashboardStats(patientId: string | undefined) {
  return useQuery({
    queryKey: ['dashboard', 'stats', patientId],
    queryFn: () => appointmentsApi.getDashboardStats(patientId!),
    enabled: Boolean(patientId),
  })
}
