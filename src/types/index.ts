export type AppointmentStatus =
  | 'pendiente'
  | 'confirmada'
  | 'cancelada'
  | 'completada'

export type UserRole = 'paciente' | 'medico' | 'admin'

export interface User {
  id: string
  email: string
  password: string
  fullName: string
  role: UserRole
  phone: string
  avatarUrl?: string
}

export interface Doctor {
  id: string
  fullName: string
  specialty: string
  avatarUrl?: string
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  reason: string
  status: AppointmentStatus
  location: string
  createdAt: string
}

export interface AuthSession {
  token: string
  user: Omit<User, 'password'>
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface CreateAppointmentPayload {
  doctorId: string
  date: string
  time: string
  reason: string
}

export interface DashboardStats {
  total: number
  pendiente: number
  confirmada: number
  cancelada: number
  completada: number
  nextAppointment: Appointment | null
}
