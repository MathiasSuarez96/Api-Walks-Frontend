import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          
          <Link to="/" className="text-2xl font-bold">
            🐕 API Walks
          </Link>

          
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login" className="hover:text-blue-200">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
                <Link to="/walks" className="hover:text-blue-200">
                  Paseos
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" className="hover:text-blue-200">
                    Admin
                  </Link>
                )}
                <span className="text-blue-200">
                  Hola, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Salir
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;