import type { CreateAppointmentPayload, Appointment } from '@/types'
import { mockDb } from '@/mocks/db/mockDb'

export const appointmentsApi = {
  getAll: (patientId: string): Promise<Appointment[]> =>
    mockDb.getAppointments(patientId),

  create: (
    patientId: string,
    payload: CreateAppointmentPayload,
  ): Promise<Appointment> => mockDb.createAppointment(patientId, payload),

  getDoctors: () => mockDb.getDoctors(),

  getDashboardStats: (patientId: string) =>
    mockDb.getDashboardStats(patientId),
}
