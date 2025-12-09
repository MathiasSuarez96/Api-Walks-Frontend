import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isSubmitting, error, resetError } = useLogin();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      resetError();
      const success = await login({ email, password });
      
      if (success) {
        setStatusMessage('¡Inicio de sesión exitoso!');
        setTimeout(() => navigate('/dashboard'), 1000);
      }
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        
        <Input
          id="password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {typeof error === 'object' ? Object.values(error).join(', ') : error}
        </div>
      )}

      {/* Mensaje de éxito */}
      {statusMessage && !error && (
        <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
          {statusMessage}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
}