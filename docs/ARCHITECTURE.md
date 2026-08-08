# Arquitectura — MediCitas

## 1. Wireframe textual

### Login (`/login`)

```
┌─────────────────────────────────────────────┐
│              [ Logo + ]                     │
│         Portal del Paciente                 │
│   Inicia sesión para gestionar tus citas    │
│                                             │
│   Correo electrónico  [________________]    │
│   Contraseña          [________________]    │
│                                             │
│          [ Iniciar sesión ]                 │
│                                             │
│   ┌─ Usuario de prueba ─────────────────┐   │
│   │ Email: paciente@test.com            │   │
│   │ Contraseña: Test123!                │   │
│   │ [ Usar credenciales de prueba ]     │   │
│   └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### Dashboard del paciente (`/dashboard`)

```
┌──────────────────────────────────────────────────────────────┐
│ MediCitas                    Hola, María González  [Logout]  │
│                              paciente@test.com               │
├──────────────────────────────────────────────────────────────┤
│  RESUMEN DE CITAS                                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │ Total 3 │ │ Pend. 1 │ │ Conf. 1 │ │ Compl.1 │            │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘            │
├──────────────────────────────────┬───────────────────────────┤
│  MIS CITAS        [Nueva cita]   │  PRÓXIMA CITA             │
│                                  │  Dr. Carlos Ruiz          │
│  ┌ Formulario nueva cita ──────┐ │  Medicina General         │
│  │ Médico [select]             │ │  2026-08-15 · 10:00       │
│  │ Fecha  [date]  Hora [time]  │ │  [Confirmada]             │
│  │ Motivo [textarea]           │ │                           │
│  │ [Cancelar] [Agendar cita]   │ │                           │
│  └─────────────────────────────┘ │                           │
│                                  │                           │
│  ┌ Cita card ─────────────────┐ │                           │
│  │ Dr. Carlos Ruiz [Confirmada]│ │                           │
│  │ Medicina General            │ │                           │
│  │ 15 ago 2026 · 10:00 hrs     │ │                           │
│  │ Motivo: Seguimiento         │ │                           │
│  └─────────────────────────────┘ │                           │
│  ... más citas ...               │                           │
└──────────────────────────────────┴───────────────────────────┘
```

**Responsive:** En móvil, las tarjetas de resumen pasan a 2 columnas; el panel de próxima cita se apila debajo de la lista.

---

## 2. Componentes React

| Componente | Ubicación | Responsabilidad |
|------------|-----------|-----------------|
| `LoginForm` | `features/auth/components` | Formulario login + credenciales demo |
| `LoginPage` | `features/auth/pages` | Guard de ruta, redirect si autenticado |
| `PatientDashboard` | `features/dashboard/components` | Layout principal del paciente |
| `DashboardHeader` | `features/dashboard/components` | Saludo, email, logout |
| `DashboardStatsCards` | `features/dashboard/components` | KPIs por estado de cita |
| `NextAppointmentCard` | `features/dashboard/components` | Próxima cita programada |
| `AppointmentList` | `features/appointments/components` | Lista con loading/empty |
| `AppointmentCard` | `features/appointments/components` | Detalle de una cita |
| `AppointmentStatusBadge` | `features/appointments/components` | Badge de estado |
| `CreateAppointmentForm` | `features/appointments/components` | Alta de nueva cita |
| `Button`, `Input`, `Card`, `Spinner`, `EmptyState` | `shared/components/ui` | UI reutilizable |

### Hooks reutilizables

| Hook | Ubicación | Uso |
|------|-----------|-----|
| `useAuth` | `features/auth/hooks` | Sesión actual |
| `useLogin` / `useLogout` | `features/auth/hooks` | Mutaciones de auth |
| `useAppointments` | `features/appointments/hooks` | Query de citas |
| `useDoctors` | `features/appointments/hooks` | Query de médicos |
| `useDashboardStats` | `features/appointments/hooks` | Estadísticas |
| `useCreateAppointment` | `features/appointments/hooks` | Crear cita |

---

## 3. Estructura API (mock)

Toda la capa simula una API REST con delay artificial.

### Auth

| Método | Endpoint mock | Función | Request | Response |
|--------|---------------|---------|---------|----------|
| POST | `/auth/login` | `authApi.login` | `{ email, password }` | `{ token, user }` |
| POST | `/auth/logout` | `authApi.logout` | — | `void` |
| GET | `/auth/session` | `authApi.getSession` | — | `AuthSession \| null` |

### Citas

| Método | Endpoint mock | Función | Request | Response |
|--------|---------------|---------|---------|----------|
| GET | `/appointments?patientId=` | `appointmentsApi.getAll` | `patientId` | `Appointment[]` |
| POST | `/appointments` | `appointmentsApi.create` | `CreateAppointmentPayload` | `Appointment` |
| GET | `/doctors` | `appointmentsApi.getDoctors` | — | `Doctor[]` |
| GET | `/dashboard/stats?patientId=` | `appointmentsApi.getDashboardStats` | `patientId` | `DashboardStats` |

Implementación central: `src/mocks/db/mockDb.ts`

---

## 4. Modelo de datos

### User

```ts
{
  id: string
  email: string
  password: string        // solo en mock, nunca en sesión
  fullName: string
  role: 'paciente' | 'medico' | 'admin'
  phone: string
  avatarUrl?: string
}
```

### Appointment

```ts
{
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string            // YYYY-MM-DD
  time: string            // HH:mm
  reason: string
  status: 'pendiente' | 'confirmada' | 'cancelada' | 'completada'
  location: string
  createdAt: string       // ISO 8601
}
```

### Doctor

```ts
{
  id: string
  fullName: string
  specialty: string
  avatarUrl?: string
}
```

### AuthSession

```ts
{
  token: string
  user: Omit<User, 'password'>
}
```

### DashboardStats

```ts
{
  total: number
  pendiente: number
  confirmada: number
  cancelada: number
  completada: number
  nextAppointment: Appointment | null
}
```

### Usuario de prueba (seed)

```ts
{
  id: 'usr-001',
  email: 'paciente@test.com',
  password: 'Test123!',
  fullName: 'María González',
  role: 'paciente',
  phone: '+52 55 1234 5678'
}
```
