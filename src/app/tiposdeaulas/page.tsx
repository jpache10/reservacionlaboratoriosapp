"use client";

import { useEffect, useState, useRef } from "react";
import { getTipoAulas } from "./tiposdeaulasservice";
import { TipoAula } from "./tiposdeaulas";

export default function TiposDeAulasPage() {
  const [tipoAulas, setTipoAulas] = useState<TipoAula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTipoAulas();
        setTipoAulas(response.data);
      } catch (error) {
        setError("Error al cargar los datos: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mostrar u ocultar el modal según el estado
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isModalOpen]);

  // Cerrar el modal al cambiar el estado
  useEffect(() => {
    if (!isModalOpen && modalRef.current) {
      modalRef.current.close();
    }
  }, [isModalOpen]);

  if (loading) {
    return <p className="text-center mt-4">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">{error}</p>;
  }

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-gray-700 font-bold mb-5">Tipos de Aulas</h1>
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <a href="/" className="text-gray-500 hover:text-gray-700">Dashboard</a>
          </li>
          <li>
            <a className="text-gray-700 font-bold">Tipos de Aulas</a>
          </li>
        </ul>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">ID</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Descripción</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Estado</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Creado</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actualizado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {tipoAulas.map((aula) => (
              <tr key={aula.TipoAulaID} className="hover:bg-gray-50">
                <td className="px-6 py-4">{aula.TipoAulaID}</td>
                <td className="px-6 py-4">{aula.Descripcion}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                      aula.Estado === "Activo" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        aula.Estado === "Activo" ? "bg-green-600" : "bg-red-600"
                      }`}
                    ></span>
                    {aula.Estado}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(aula.created_at).toLocaleString()}</td>
                <td className="px-6 py-4">{new Date(aula.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmación</h3>
            <p className="py-4">
              Aquí puedes añadir contenido modal si lo necesitas en el futuro.
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>Cerrar</button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
