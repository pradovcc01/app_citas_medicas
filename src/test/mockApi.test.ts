import { describe, it, expect, beforeEach } from 'vitest'
import { mockDb } from '@/mocks/db/mockDb'
import { TEST_USER } from '@/mocks/data'

describe('Mock API — Autenticación', () => {
  beforeEach(() => {
    mockDb.reset()
  })

  it('login exitoso con usuario de prueba', async () => {
    const session = await mockDb.login({
      email: TEST_USER.email,
      password: TEST_USER.password,
    })

    expect(session.token).toBeTruthy()
    expect(session.user.email).toBe('paciente@test.com')
    expect(session.user.fullName).toBe('María González')
    expect(session.user).not.toHaveProperty('password')
    expect(mockDb.getSession()?.token).toBe(session.token)
  })

  it('login fallido con credenciales incorrectas', async () => {
    await expect(
      mockDb.login({ email: TEST_USER.email, password: 'wrong-password' }),
    ).rejects.toThrow('Credenciales inválidas')
  })

  it('logout limpia la sesión', async () => {
    await mockDb.login({
      email: TEST_USER.email,
      password: TEST_USER.password,
    })
    expect(mockDb.getSession()).not.toBeNull()

    await mockDb.logout()
    expect(mockDb.getSession()).toBeNull()
  })
})

describe('Mock API — Citas', () => {
  beforeEach(() => {
    mockDb.reset()
  })

  it('lista citas del paciente de prueba', async () => {
    const appointments = await mockDb.getAppointments(TEST_USER.id)

    expect(appointments.length).toBeGreaterThanOrEqual(3)
    expect(appointments.every((a) => a.patientId === TEST_USER.id)).toBe(true)
    expect(appointments.some((a) => a.status === 'confirmada')).toBe(true)
    expect(appointments.some((a) => a.status === 'pendiente')).toBe(true)
  })

  it('crea una nueva cita con estado pendiente', async () => {
    const before = await mockDb.getAppointments(TEST_USER.id)
    const beforeCount = before.length

    const newAppointment = await mockDb.createAppointment(TEST_USER.id, {
      doctorId: 'doc-002',
      date: '2026-09-01',
      time: '11:30',
      reason: 'Consulta de prueba automatizada',
    })

    const after = await mockDb.getAppointments(TEST_USER.id)

    expect(after.length).toBe(beforeCount + 1)
    expect(newAppointment.status).toBe('pendiente')
    expect(newAppointment.doctorName).toBe('Dra. Ana Martínez')
    expect(newAppointment.specialty).toBe('Cardiología')
    expect(newAppointment.reason).toBe('Consulta de prueba automatizada')
    expect(after[0].id).toBe(newAppointment.id)
  })

  it('calcula estadísticas del dashboard', async () => {
    await mockDb.createAppointment(TEST_USER.id, {
      doctorId: 'doc-001',
      date: '2026-09-10',
      time: '16:00',
      reason: 'Chequeo general',
    })

    const stats = await mockDb.getDashboardStats(TEST_USER.id)

    expect(stats.total).toBeGreaterThanOrEqual(4)
    expect(stats.pendiente).toBeGreaterThanOrEqual(2)
    expect(stats.nextAppointment).not.toBeNull()
  })
})

describe('Flujo integrado — Login + Crear cita', () => {
  beforeEach(() => {
    mockDb.reset()
  })

  it('autentica y crea cita en secuencia', async () => {
    const session = await mockDb.login({
      email: 'paciente@test.com',
      password: 'Test123!',
    })

    const appointment = await mockDb.createAppointment(session.user.id, {
      doctorId: 'doc-003',
      date: '2026-08-25',
      time: '09:30',
      reason: 'Revisión dermatológica',
    })

    const stats = await mockDb.getDashboardStats(session.user.id)
    const appointments = await mockDb.getAppointments(session.user.id)

    expect(session.user.fullName).toBe('María González')
    expect(appointment.patientId).toBe(session.user.id)
    expect(appointment.status).toBe('pendiente')
    expect(stats.pendiente).toBeGreaterThanOrEqual(2)
    expect(appointments.some((a) => a.id === appointment.id)).toBe(true)

    console.log('\n=== RESULTADOS DE PRUEBA ===')
    console.log('Login OK:', session.user.email, '→', session.user.fullName)
    console.log('Token generado:', session.token.slice(0, 20) + '...')
    console.log('Cita creada:', {
      id: appointment.id,
      medico: appointment.doctorName,
      fecha: appointment.date,
      hora: appointment.time,
      estado: appointment.status,
    })
    console.log('Total citas:', stats.total, '| Pendientes:', stats.pendiente)
  })
})
