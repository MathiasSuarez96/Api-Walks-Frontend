import { Navigate } from "react-router-dom";
import {useAuth} from "../auth/AuthContext";

function ProtectedRoute({children}) {
  const {user , loading} = useAuth();
  if(loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl text-gray-600">Cargando...</div>
        </div>
    );
  }
  if(!user) {
    return <Navigate to="/login" replace />
  }
  return children;
}
export default ProtectedRoute;