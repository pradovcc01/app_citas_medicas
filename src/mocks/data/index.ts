import type { User, Doctor, Appointment } from '@/types'

/** Usuario de prueba para login */
export const TEST_USER: User = {
  id: 'usr-001',
  email: 'paciente@test.com',
  password: 'Test123!',
  fullName: 'María González',
  role: 'paciente',
  phone: '+52 55 1234 5678',
  avatarUrl: undefined,
}

export const MOCK_USERS: User[] = [
  TEST_USER,
  {
    id: 'usr-002',
    email: 'doctor@test.com',
    password: 'Doctor123!',
    fullName: 'Dr. Carlos Ruiz',
    role: 'medico',
    phone: '+52 55 8765 4321',
  },
]

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-001',
    fullName: 'Dr. Carlos Ruiz',
    specialty: 'Medicina General',
  },
  {
    id: 'doc-002',
    fullName: 'Dra. Ana Martínez',
    specialty: 'Cardiología',
  },
  {
    id: 'doc-003',
    fullName: 'Dr. Luis Herrera',
    specialty: 'Dermatología',
  },
]

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    patientId: 'usr-001',
    doctorId: 'doc-001',
    doctorName: 'Dr. Carlos Ruiz',
    specialty: 'Medicina General',
    date: '2026-08-15',
    time: '10:00',
    reason: 'Consulta de seguimiento',
    status: 'confirmada',
    location: 'Consultorio 204 — Torre A',
    createdAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'apt-002',
    patientId: 'usr-001',
    doctorId: 'doc-002',
    doctorName: 'Dra. Ana Martínez',
    specialty: 'Cardiología',
    date: '2026-08-20',
    time: '14:30',
    reason: 'Electrocardiograma de rutina',
    status: 'pendiente',
    location: 'Consultorio 112 — Torre B',
    createdAt: '2026-08-05T08:30:00.000Z',
  },
  {
    id: 'apt-003',
    patientId: 'usr-001',
    doctorId: 'doc-003',
    doctorName: 'Dr. Luis Herrera',
    specialty: 'Dermatología',
    date: '2026-07-10',
    time: '09:00',
    reason: 'Revisión de lunares',
    status: 'completada',
    location: 'Consultorio 305 — Torre A',
    createdAt: '2026-06-28T12:00:00.000Z',
  },
]
