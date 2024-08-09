"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { createEmpleado } from "../empleadoservice";
import { EmpleadoPost } from "../empleado";

export default function RegistrarEmpleadoPage() {
  const [empleado, setEmpleado] = useState<EmpleadoPost>({
    nombre: "",
    cedula: "",
    tandaLabor: "Mañana",
    fechaIngreso: "",
    correoElectronico: "",
    noCarnet: "",
    estado: "Activo",
  });
  
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmpleado({ ...empleado, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createEmpleado(empleado);
      router.push("/empleados");
    } catch (err) {
      console.error("Error creating empleado:", err);
      setError("Hubo un error al registrar el empleado. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-gray-700 font-bold mb-5">Registrar Empleado</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={empleado.nombre}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cédula</label>
          <input
            type="text"
            name="cedula"
            value={empleado.cedula}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanda Laboral</label>
          <select
            name="tandaLabor"
            value={empleado.tandaLabor}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso</label>
          <input
            type="date"
            name="fechaIngreso"
            value={empleado.fechaIngreso}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="correoElectronico"
            value={empleado.correoElectronico}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">No. Carnet</label>
          <input
            type="text"
            name="noCarnet"
            value={empleado.noCarnet}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            name="estado"
            value={empleado.estado}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
        <div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Registrar Empleado
          </button>
        </div>
      </form>
    </div>
  );
}
