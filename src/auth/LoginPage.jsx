import { Link } from 'react-router-dom';
import { LoginForm } from './LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 to-purple-600 px-4">
      <div className="w-full max-w-md">
        {/* Tarjeta */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🐕 API Walks
            </h1>
            <p className="text-gray-600">
              Inicia sesión para gestionar paseos de perros
            </p>
          </div>

          {/* Formulario */}
          <LoginForm />

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tenés cuenta?{' '}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Registrate aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Footer externo */}
        <p className="text-center text-white text-sm mt-4 opacity-90">
          Plataforma de gestión de paseos caninos
        </p>
      </div>
    </div>
  );
}