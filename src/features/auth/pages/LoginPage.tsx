import { Navigate } from 'react-router-dom'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Spinner } from '@/shared/components/ui/Spinner'

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-[#dce9e5] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <main className="login-enter mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[2rem] bg-[#fbfaf7] shadow-[0_24px_70px_rgba(22,55,54,0.18)] sm:min-h-[calc(100vh-3rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="login-grid-pattern relative hidden overflow-hidden bg-[#164b4a] px-10 py-10 text-[#f8f5eb] lg:flex lg:flex-col lg:justify-between xl:px-14 xl:py-14">
          <div className="relative z-10">
            <div className="mb-16 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8b86d] text-2xl font-bold text-[#164b4a]">
                +
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.18em]">
                Cuida
              </span>
            </div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#b9d8ce]">
              Tu salud, en un solo lugar
            </p>
            <h2 className="login-display max-w-md text-5xl leading-[1.02] xl:text-6xl">
              El próximo paso empieza aquí.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#c9dfd6]">
              Consulta tus citas, encuentra a tu especialista y mantén tu cuidado en movimiento.
            </p>
          </div>

          <div className="relative z-10 max-w-sm rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b9d8ce]">
                  Próxima cita
                </p>
                <p className="mt-3 text-lg font-semibold">Medicina General</p>
                <p className="mt-1 text-sm text-[#c9dfd6]">Jueves, 20 de agosto · 14:30</p>
              </div>
              <span className="rounded-full bg-[#e8b86d] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#164b4a]">
                Pendiente
              </span>
            </div>
            <div className="mt-5 h-px bg-white/15" />
            <p className="mt-4 text-sm text-[#c9dfd6]">Dra. Ana Martínez · Consultorio 112</p>
          </div>

          <span className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full border-[32px] border-[#e8b86d]/20" />
        </section>

        <section className="flex items-center px-6 py-10 sm:px-12 lg:px-14 xl:px-20">
          <LoginForm />
        </section>
      </main>
    </div>
  )
}
