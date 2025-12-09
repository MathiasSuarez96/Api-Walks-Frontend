import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

export const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { login: authLogin } = useAuth();

  const handleLogin = async (credentials) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await authLogin(credentials);
      if (!result.success) {
        setError(result.error);
        return false;
      }
      return true;
    } catch (err) {
      setError('Error inesperado. Intentá de nuevo.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  return {
    login: handleLogin,
    isSubmitting,
    error,
    resetError
  };
};