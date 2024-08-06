// pages/usuarios/registrar.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UsuarioPost } from "../../usuario"; // Asegúrate de que la ruta sea correcta
import { createUsuario } from "../../usuarioservice"; // Asegúrate de que la ruta sea correcta
import Link from "next/link";

export default function NewUserForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<UsuarioPost>({
    usuario: "",
    tipoUsuario: "Estudiante",
    clave: "",
    estado: "Activo",
    id_empleado: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "id_empleado" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUsuario(formData);
      console.log("Form submitted:", formData);
      router.push("/usuarios");
    } catch (error) {
      console.error("Error creating usuario:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      usuario: "",
      tipoUsuario: "Estudiante",
      clave: "",
      estado: "Activo",
      id_empleado: 0,
    });
  };

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-black font-bold mb-5">Usuarios</h1>
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <Link href="/usuarios" className="text-gray-500 hover:text-black">
              Usuarios
            </Link>
          </li>
          <li>
            <span className="text-black font-bold">Registrar</span>
          </li>
        </ul>
      </div>
      <div className="mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Nuevo Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usuario" className="block text-sm font-medium text-black mb-1">
              Usuario<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="usuario"
              id="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clave" className="block text-sm font-medium text-black mb-1">
              Contraseña<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="clave"
              id="clave"
              value={formData.clave}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id_empleado" className="block text-sm font-medium text-black mb-1">
              ID del Empleado<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="id_empleado"
              id="id_empleado"
              value={formData.id_empleado}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tipo_usuario" className="block text-sm font-medium text-black mb-1">
                Tipo de Usuario<span className="text-red-500">*</span>
              </label>
              <select
                name="tipo_usuario"
                id="tipo_usuario"
                value={formData.tipoUsuario}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
                required
              >
                <option value="Profesor">Profesor</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Empleado">Empleado</option>
                <option value="Otro">Otro</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>
            <div>
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