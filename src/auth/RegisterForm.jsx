import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { registerUser } from "../utils/api";

export function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser({ name: username, email, password });
      setSuccess('¡Cuenta creada! Redirigiendo...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear la cuenta');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input id="username" label="Nombre de usuario" type="text" placeholder="Tu nombre" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <Input id="email" label="Correo electrónico" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input id="password" label="Contraseña" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Input id="confirmPassword" label="Confirmar contraseña" type="password" placeholder="Repetí tu contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      {error && <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
      {success && <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">{success}</div>}
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}</Button>
    </form>
  );
}