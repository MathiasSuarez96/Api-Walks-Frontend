import { Link } from 'react-router-dom';
import { RegisterForm } from './RegisterForm';

export function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-600 to-blue-600 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🐕 API Walks</h1>
            <p className="text-gray-600">Creá tu cuenta para empezar</p>
          </div>
          <RegisterForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tenés cuenta?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                Iniciá sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}