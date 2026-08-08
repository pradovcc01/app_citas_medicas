import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/shared/components/ui/Input'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
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
    <Card className="w-full max-w-md">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
          <span className="text-xl font-bold">+</span>
        </div>
        <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
          Portal del Paciente
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Inicia sesión para gestionar tus citas médicas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="paciente@test.com"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {login.isError && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {login.error instanceof Error
              ? login.error.message
              : 'Error al iniciar sesión'}
          </p>
        )}

        <Button type="submit" className="w-full" isLoading={login.isPending}>
          Iniciar sesión
        </Button>
      </form>

      <div className="mt-6 rounded-lg bg-primary-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
          Usuario de prueba
        </p>
        <p className="mt-1 text-sm text-neutral-700">
          <span className="font-medium">Email:</span> {TEST_USER.email}
        </p>
        <p className="text-sm text-neutral-700">
          <span className="font-medium">Contraseña:</span> {TEST_USER.password}
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-3 w-full"
          onClick={fillTestCredentials}
        >
          Usar credenciales de prueba
        </Button>
      </div>
    </Card>
  )
}
