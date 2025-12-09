import { useState, useEffect } from "react";
import { getAllWalks, deleteWalk } from "../utils/api";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function WalksPage() {
  const [walks, setWalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWalks();
  }, []);

  const fetchWalks = async () => {
    try {
      setLoading(true);
      const response = await getAllWalks();
      setWalks(response.data || response);
    } catch (err) {
      setError("Error al cargar los paseos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este paseo?")) {
      return;
    }

    try {
      await deleteWalk(id);
      setWalks(walks.filter(walk => walk._id !== id));
    } catch (err) {
      setError("Error al eliminar el paseo");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando paseos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🐕 Paseos</h1>
          <p className="text-gray-600 mt-1">Gestiona los paseos de perros</p>
        </div>
        <Link to="/walks/new">
          <Button>+ Nuevo Paseo</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {walks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No hay paseos registrados</p>
          <Link to="/walks/new" className="text-blue-600 hover:underline mt-2 inline-block">
            Crear el primer paseo
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distancia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {walks.map((walk) => (
                <tr key={walk._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{walk.dogName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(walk.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {walk.durationMinutes} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {walk.distanceKm} km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Link to={`/walks/edit/${walk._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        Editar
                      </Link>
                      <button onClick={() => handleDelete(walk._id)} className="text-red-600 hover:text-red-800 font-medium">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}