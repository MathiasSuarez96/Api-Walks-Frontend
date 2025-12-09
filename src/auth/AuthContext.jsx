import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, logoutUser } from "../utils/api";

// Crear el Context
const AuthContext = createContext();

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay token al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));

        setUser({
          id: payload.id,
          email: payload.email,
          username: payload.username,
          role: payload.role
        });
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
      }
    }
    
    setLoading(false);
  }, []); 

  // Función de login
  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const token = response.token;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));

      setUser({
        id: payload.id,
        email: payload.email,
        username: payload.username,
        role: payload.role
      });
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Error al iniciar sesión"
      };
    }
  };

  // Función de logout
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // Verificar si es admin
  const isAdmin = user?.role === "admin";

  // Valor que compartimos
  const value = {
    user,
    login,
    logout,
    isAdmin,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};