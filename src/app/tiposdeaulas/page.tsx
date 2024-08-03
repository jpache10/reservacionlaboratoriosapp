"use client";
import { useEffect, useState } from 'react';
import { getTipoAulas } from './tiposdeaulasservice';
import { TipoAula } from './tiposdeaulas';

export default function Page() {
  const [tipoAulas, setTipoAulas] = useState<TipoAula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTipoAulas();
        setTipoAulas(data.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tipos de Aulas</h1>
      <ul className="space-y-4">
        {tipoAulas.map((aula) => (
          <li key={aula.TipoAulaID} className="border p-4 rounded-lg shadow">
            <p><strong>Descripción:</strong> {aula.Descripcion}</p>
            <p><strong>Estado:</strong> {aula.Estado}</p>
            <p><strong>Creado:</strong> {new Date(aula.created_at).toLocaleString()}</p>
            <p><strong>Actualizado:</strong> {new Date(aula.updated_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}