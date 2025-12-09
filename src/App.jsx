import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { LoginPage } from "./auth/LoginPage";
import { RegisterPage } from "./auth/RegisterPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import WalksPage from "./pages/WalksPage";
import WalkFormPage from "./pages/WalkFormPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas SIN navbar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas privadas CON navbar */}
          <Route path="/*" element={<PrivateLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function PrivateLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">🐕 Bienvenido a API Walks</h1>
              <p className="text-gray-600">Tu plataforma de gestión de paseos caninos</p>
            </div>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <WalksPage />
            </ProtectedRoute>
          } />
          <Route path="/walks" element={
            <ProtectedRoute>
              <WalksPage />
            </ProtectedRoute>
          } />
          <Route path="/walks/new" element={
            <ProtectedRoute>
              <WalkFormPage />
            </ProtectedRoute>
          } />
          <Route path="/walks/edit/:id" element={
            <ProtectedRoute>
              <WalkFormPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;