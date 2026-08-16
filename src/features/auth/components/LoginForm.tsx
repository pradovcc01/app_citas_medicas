import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/shared/components/ui/Input'
import { Button } from '@/shared/components/ui/Button'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { TEST_USER } from '@/mocks/data'

export function LoginForm() {
  const navigate = useNavigate()
  const login = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    login.mutate(
      { email, password },
      {
        onSuccess: () => navigate('/dashboard'),
      },
    )
  }

  const fillTestCredentials = () => {
    setEmail(TEST_USER.email)
    setPassword(TEST_USER.password)
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-10">
        <div className="mb-7 flex items-center gap-3 lg:hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#164b4a] text-xl font-bold text-[#e8b86d]">
            +
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#164b4a]">
            Cuida
          </span>
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2f7a72]">
          Portal del paciente
        </p>
        <h1 className="login-display text-4xl leading-tight text-[#183c3b] sm:text-5xl">
          Bienvenido de vuelta.
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-6 text-[#687a76]">
          Accede para revisar tus citas y seguir de cerca tu atención médica.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="paciente@test.com"
          className="border-[#d5dfdb] bg-[#f7f8f5] py-3 focus:border-[#2f7a72] focus:ring-[#d8ebe5]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="border-[#d5dfdb] bg-[#f7f8f5] py-3 focus:border-[#2f7a72] focus:ring-[#d8ebe5]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {login.isError && (
          <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {login.error instanceof Error
              ? login.error.message
              : 'Error al iniciar sesión'}
          </p>
        )}

        <Button
          type="submit"
          className="w-full rounded-xl bg-[#164b4a] py-3.5 text-sm hover:bg-[#0f3c3b] focus:ring-[#a9d4c8]"
          isLoading={login.isPending}
        >
          Iniciar sesión
        </Button>
      </form>

      <div className="mt-8 border-t border-[#e1e7e3] pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2f7a72]">
          Acceso de demostración
        </p>
        <p className="mt-2 text-sm text-[#687a76]">
          Explora el portal con una cuenta de paciente ya configurada.
        </p>
        <div className="mt-3 rounded-xl bg-[#eef4f0] px-3 py-2.5 text-sm text-[#365552]">
          <span className="font-medium">{TEST_USER.email}</span>
          <span className="mx-2 text-[#9ab1aa]">·</span>
          <span>{TEST_USER.password}</span>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-3 w-full rounded-xl border-[#d5dfdb] bg-transparent text-[#164b4a] hover:bg-[#eef4f0]"
          onClick={fillTestCredentials}
        >
          Usar cuenta de demostración
        </Button>
      </div>
    </div>
  )
}
