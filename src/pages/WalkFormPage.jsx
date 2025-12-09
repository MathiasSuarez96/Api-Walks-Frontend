import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createWalk, updateWalk, getWalkById } from "../utils/api";
import Input from "../components/Input";
import Button from "../components/Button";

export default function WalkFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    dogName: "",
    date: "",
    durationMinutes: "",
    distanceKm: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      fetchWalk();
    }
  }, [id]);

  const fetchWalk = async () => {
    try {
      setLoading(true);
      const response = await getWalkById(id);
      const walk = response.data || response;
      setFormData({
        dogName: walk.dogName || "",
        date: walk.date ? walk.date.split("T")[0] : "",
        durationMinutes: walk.durationMinutes || "",
        distanceKm: walk.distanceKm || "",
        notes: walk.notes || ""
      });
    } catch (err) {
      setError("Error al cargar el paseo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      
      const dataToSend = {
        dogName: formData.dogName,
        date: formData.date,
        durationMinutes: Number(formData.durationMinutes),
        distanceKm: Number(formData.distanceKm),
        notes: formData.notes
      };

      if (isEditing) {
        await updateWalk(id, dataToSend);
      } else {
        await createWalk(dataToSend);
      }
      navigate("/walks");
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar el paseo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {isEditing ? "✏️ Editar Paseo" : "🐕 Nuevo Paseo"}
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="dogName"
            name="dogName"
            label="Nombre del perro"
            type="text"
            placeholder="Ej: Firulais"
            value={formData.dogName}
            onChange={handleChange}
            required
          />

          <Input
            id="date"
            name="date"
            label="Fecha del paseo"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <Input
            id="durationMinutes"
            name="durationMinutes"
            label="Duración (minutos)"
            type="number"
            placeholder="Ej: 30"
            value={formData.durationMinutes}
            onChange={handleChange}
            required
          />

          <Input
            id="distanceKm"
            name="distanceKm"
            label="Distancia (km)"
            type="number"
            step="0.1"
            placeholder="Ej: 2.5"
            value={formData.distanceKm}
            onChange={handleChange}
            required
          />

          <div className="space-y-1">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notas (opcional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              placeholder="Observaciones del paseo..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : isEditing ? "Actualizar" : "Crear Paseo"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate("/walks")}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
