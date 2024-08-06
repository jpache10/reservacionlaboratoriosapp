"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAulaById, updateAula } from "../../aulasservice"; // Ajusta el path si es necesario
import { Aula, AulaPost } from "../../aula"; // Asegúrate de que las interfaces están bien importadas
import Link from "next/link";

export default function EditClassroomForm() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<AulaPost, 'created_at' | 'updated_at'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAula = async () => {
      try {
        if (id) {
          const fetchedAula = await getAulaById(Number(id));
          console.log("Datos de aula recibidos:", fetchedAula.data);

          // Mapear Aula a AulaPost
          const aulaData: Omit<AulaPost, 'created_at' | 'updated_at'> = {
            id_aula: fetchedAula.data.AulaID, // Corregir el nombre de la propiedad
            descripcion: fetchedAula.data.Descripcion,
            tipo_aula: fetchedAula.data.TipoAulaID,
            edificio: fetchedAula.data.EdificioID,
            capacidad: fetchedAula.data.Capacidad,
            cupos: fetchedAula.data.CuposReservados,
            estado: fetchedAula.data.Estado,
          };

          setFormData(aulaData);
        }
      } catch (error) {
        console.error("Error fetching aula:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAula();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: name === "capacidad" || name === "cupos" || name === "tipo_aula" || name === "edificio"
        ? parseInt(value)  // Asegúrate de convertir a número cuando sea necesario
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      // Mapear AulaPost de nuevo a Aula
      const aulaToUpdate: Aula = {
        AulaID: formData.id_aula, // Usa el nombre correcto del ID
        Descripcion: formData.descripcion,
        TipoAulaID: formData.tipo_aula,
        EdificioID: formData.edificio,
        Capacidad: formData.capacidad,
        CuposReservados: formData.cupos,
        Estado: formData.estado,
        created_at: formData.created_at || new Date().toISOString(),  // Reutiliza las fechas o usa nuevas
        updated_at: new Date().toISOString(),
      };

      try {
        await updateAula(aulaToUpdate); // Actualiza utilizando el objeto mapeado
        console.log("Datos que se intentan enviar:", aulaToUpdate);
        router.push("/aulas");
      } catch (error) {
        console.error("Error updating aula:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-black font-bold mb-5">Editar Aula</h1>
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <a href="/aulas" className="text-gray-500 hover:text-black">
              Aulas
            </a>
          </li>
          <li>
            <span className="text-black font-bold">Editar</span>
          </li>
        </ul>
      </div>
      {formData && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-black mb-1">
              Descripción<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="capacidad" className="block text-sm font-medium text-black mb-1">
              Capacidad<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="capacidad"
              id="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cupos" className="block text-sm font-medium text-black mb-1">
              Cupos reservados<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="cupos"
              id="cupos"
              value={formData.cupos}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tipo_aula" className="block text-sm font-medium text-black mb-1">
                Tipo de Aula<span className="text-red-500">*</span>
              </label>
              <select
                name="tipo_aula"
                id="tipo_aula"
                value={formData.tipo_aula}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
                required
              >
                <option value={1}>Aula Teórica</option>
                <option value={2}>Laboratorio de Computación</option>
                <option value={3}>Aula Multimedia</option>
                <option value={4}>Auditorio</option>
                <option value={5}>Sala de Conferencias</option>
              </select>
            </div>
            <div>
              <label htmlFor="edificio" className="block text-sm font-medium text-black mb-1">
                Edificio<span className="text-red-500">*</span>
              </label>
              <select
                name="edificio"
                id="edificio"
                value={formData.edificio}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
                required
              >
                <option value={6}>Edificio Principal</option>
                <option value={7}>Edificio de Ciencias</option>
                <option value={8}>Edificio de Ingeniería</option>
                <option value={9}>Edificio de Humanidades</option>
                <option value={10}>Edificio de Administración</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="estado" className="block text-sm font-medium text-black mb-1">
              Estado<span className="text-red-500">*</span>
            </label>
            <select
              name="estado"
              id="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal">
              Guardar
            </button>
            <Link href="/aulas" className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 font-normal">
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
