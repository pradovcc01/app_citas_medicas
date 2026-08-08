import type {
  User,
  Appointment,
  Doctor,
  AuthSession,
  LoginCredentials,
  CreateAppointmentPayload,
  DashboardStats,
} from '@/types'
import {
  MOCK_USERS,
  MOCK_APPOINTMENTS,
  MOCK_DOCTORS,
} from '@/mocks/data'

const SESSION_KEY = 'medicitas_session'

let users = structuredClone(MOCK_USERS)
let appointments = structuredClone(MOCK_APPOINTMENTS)
const doctors = structuredClone(MOCK_DOCTORS)

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

const generateId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

const stripPassword = (user: User) => {
  const { password: _, ...safeUser } = user
  return safeUser
}

export const mockDb = {
  reset() {
    users = structuredClone(MOCK_USERS)
    appointments = structuredClone(MOCK_APPOINTMENTS)
    sessionStorage.removeItem(SESSION_KEY)
  },

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    await delay()
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === credentials.email.toLowerCase() &&
        u.password === credentials.password,
    )

    if (!user) {
      throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.')
    }

    const session: AuthSession = {
      token: generateId('tok'),
      user: stripPassword(user),
    }

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return session
  },

  async logout(): Promise<void> {
    await delay(200)
    sessionStorage.removeItem(SESSION_KEY)
  },

  getSession(): AuthSession | null {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthSession
    } catch {
      return null
    }
  },

  async getAppointments(patientId: string): Promise<Appointment[]> {
    await delay()
    return appointments
      .filter((a) => a.patientId === patientId)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`)
        const dateB = new Date(`${b.date}T${b.time}`)
        return dateB.getTime() - dateA.getTime()
      })
  },

  async createAppointment(
    patientId: string,
    payload: CreateAppointmentPayload,
  ): Promise<Appointment> {
    await delay(600)
    const doctor = doctors.find((d) => d.id === payload.doctorId)
    if (!doctor) {
      throw new Error('Médico no encontrado')
    }

    const newAppointment: Appointment = {
      id: generateId('apt'),
      patientId,
      doctorId: doctor.id,
      doctorName: doctor.fullName,
      specialty: doctor.specialty,
      date: payload.date,
      time: payload.time,
      reason: payload.reason,
      status: 'pendiente',
      location: 'Consultorio asignado — Torre A',
      createdAt: new Date().toISOString(),
    }

    appointments = [newAppointment, ...appointments]
    return newAppointment
  },

  async getDoctors(): Promise<Doctor[]> {
    await delay(300)
    return doctors
  },

  async getDashboardStats(patientId: string): Promise<DashboardStats> {
    await delay()
    const patientAppointments = appointments.filter(
      (a) => a.patientId === patientId,
    )

    const now = new Date()
    const upcoming = patientAppointments
      .filter(
        (a) =>
          a.status !== 'cancelada' &&
          a.status !== 'completada' &&
          new Date(`${a.date}T${a.time}`) >= now,
      )
      .sort(
        (a, b) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime(),
      )

    return {
      total: patientAppointments.length,
      pendiente: patientAppointments.filter((a) => a.status === 'pendiente')
        .length,
      confirmada: patientAppointments.filter((a) => a.status === 'confirmada')
        .length,
      cancelada: patientAppointments.filter((a) => a.status === 'cancelada')
        .length,
      completada: patientAppointments.filter((a) => a.status === 'completada')
        .length,
      nextAppointment: upcoming[0] ?? null,
    }
  },
}
