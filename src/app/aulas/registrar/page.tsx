// pages/aulas/registrar.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AulaPost } from "../aula"; // Ruta correcta según tu estructura
import { createAula } from "../aulasservice"; // Ruta correcta según tu estructura
import Link from "next/link";

export default function NewClassroomForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<AulaPost, 'id_aula' | 'created_at' | 'updated_at'>>({
    descripcion: "Nombre del aula",
    capacidad: 10,
    cupos: 5,
    tipo_aula: 1,
    edificio: 6,
    estado: "Activo",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "capacidad" || name === "cupos" || name === "tipo_aula" || name === "edificio"
        ? parseInt(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createAula(formData);
      console.log("Form submitted:", formData);
      router.push("/aulas");
    } catch (error) {
      console.error("Error creating aula:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      descripcion: "",
      capacidad: 0,
      cupos: 0,
      tipo_aula: 1,
      edificio: 5,
      estado: "Activo",
    });
  };

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-black font-bold mb-5">Aulas</h1>
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <a href="/aulas" className="text-gray-500 hover:text-black">
              Aulas
            </a>
          </li>
          <li>
            <span className="text-black font-bold">Registrar</span>
          </li>
        </ul>
      </div>
      <div className="mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Nueva Aula</h1>
        <form onSubmit={handleSubmit}>
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
                <option value="" disabled>
                  Selecciona un edificio
                </option>
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
          <div className="flex justify-center">
            <div className="flex justify-between text-sm mt-5 space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal"
              >
                CREAR
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 font-normal"
              >
                BORRAR DATOS
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 font-normal"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
