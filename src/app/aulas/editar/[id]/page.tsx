"use client";

import { useParams, useRouter } from "next/navigation"; // Importa useParams y useRouter
import { useEffect, useState } from "react";
import { getAulaById, updateAula } from "../../aulasservice"; // Ajusta el path si es necesario
import { Aula } from "../../aula"; // Ajusta el path si es necesario
import Link from "next/link";

export default function Page() {
  const { id } = useParams(); // Usa useParams para obtener el id de la URL
  const router = useRouter(); // Usa useRouter para la navegación
  const [aula, setAula] = useState<Aula | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchAula = async () => {
        try {
          const fetchedAula = await getAulaById(Number(id));
          setAula(fetchedAula.data);
        } catch (error) {
          console.error("Error fetching aula:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAula();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAula((prevAula) => (prevAula ? { ...prevAula, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (aula) {
      try {
        await updateAula(aula);
        router.push("/aulas");
      } catch (error) {
        console.error("Error updating aula:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl text-gray-700 font-bold mb-5">Editar Aula</h1>
      {aula && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <input
              type="text"
              name="Descripcion"
              value={aula.Descripcion}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Aula</label>
            <input
              type="number"
              name="TipoAulaID"
              value={aula.TipoAulaID}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Edificio</label>
            <input
              type="number"
              name="EdificioID"
              value={aula.EdificioID}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Capacidad</label>
            <input
              type="number"
              name="Capacidad"
              value={aula.Capacidad}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cupos Reservados</label>
            <input
              type="number"
              name="CuposReservados"
              value={aula.CuposReservados}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Estado</label>
            <select
              name="Estado"
              value={aula.Estado}
              onChange={handleChange}
              className="mt-1 block w-full"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <Link href="/aulas" className="btn btn-secondary">
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}