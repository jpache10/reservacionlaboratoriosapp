"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReservacionPost } from "../reservacion";
import { createReservacion } from "../reservacionservice";
import { getAulas } from "../../aulas/aulasservice"; 
import { getEmpleados } from "../../empleados/empleadoService"; 
import { getUsuarios } from "../../usuarios/usuarioservice"; 
import { Aula } from "../../aulas/aula"; 
import { Empleado } from "../../empleados/empleado";
import { Usuario } from "../../usuarios/usuario";
import Link from "next/link";

export default function NewReservationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<ReservacionPost>({
    id_empleado: 0,
    id_aula: 0,
    fecha_reservacion: new Date(),
    cantidad_hora: 1,
    usuarioID: 0,
    comentario: "",
    estado: "Pendiente",
  });

  const [aulas, setAulas] = useState<Aula[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const response = await getAulas();
        setAulas(response.data);
      } catch (error) {
        console.error("Error fetching aulas:", error);
      }
    };

    const fetchEmpleados = async () => {
      try {
        const response = await getEmpleados();
        setEmpleados(response.data);
      } catch (error) {
        console.error("Error fetching empleados:", error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await getUsuarios();
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    fetchAulas();
    fetchEmpleados();
    fetchUsuarios();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "id_empleado" || name === "id_aula" || name === "usuarioID" || name === "cantidad_hora"
        ? parseInt(value)
        : name === "fecha_reservacion"
        ? new Date(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createReservacion(formData);
      console.log("Reservation created:", formData);
      router.push("/reservaciones");
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      id_empleado: 0,
      id_aula: 0,
      fecha_reservacion: new Date(),
      cantidad_hora: 1,
      usuarioID: 0,
      comentario: "",
      estado: "Pendiente",
    });
  };

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-black font-bold mb-5">Reservaciones</h1>
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <Link href="/reservaciones" className="text-gray-500 hover:text-black">
              Reservaciones
            </Link>
          </li>
          <li>
            <span className="text-black font-bold">Registrar</span>
          </li>
        </ul>
      </div>
      <div className="mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Nueva Reservación</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="id_empleado" className="block text-sm font-medium text-black mb-1">
              Empleado<span className="text-red-500">*</span>
            </label>
            <select
              name="id_empleado"
              id="id_empleado"
              value={formData.id_empleado}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            >
              <option value="" disabled>
                Selecciona un empleado
              </option>
              {empleados.map((empleado) => (
                <option key={empleado.EmpleadoID} value={empleado.EmpleadoID}>
                  {empleado.Nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="id_aula" className="block text-sm font-medium text-black mb-1">
              Aula<span className="text-red-500">*</span>
            </label>
            <select
              name="id_aula"
              id="id_aula"
              value={formData.id_aula}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            >
              <option value="" disabled>
                Selecciona un aula
              </option>
              {aulas.map((aula) => (
                <option key={aula.AulaID} value={aula.AulaID}>
                  {aula.Descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="usuarioID" className="block text-sm font-medium text-black mb-1">
              Usuario<span className="text-red-500">*</span>
            </label>
            <select
              name="usuarioID"
              id="usuarioID"
              value={formData.usuarioID}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            >
              <option value="" disabled>
                Selecciona un usuario
              </option>
              {usuarios.map((usuario) => (
                <option key={usuario.UsuarioID} value={usuario.UsuarioID}>
                  {usuario.Usuario}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="fecha_reservacion" className="block text-sm font-medium text-black mb-1">
              Fecha y Hora de Reservación<span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="fecha_reservacion"
              id="fecha_reservacion"
              value={formData.fecha_reservacion.toISOString().slice(0, 16)}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cantidad_hora" className="block text-sm font-medium text-black mb-1">
              Cantidad de Horas<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="cantidad_hora"
              id="cantidad_hora"
              value={formData.cantidad_hora}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
              min="1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comentario" className="block text-sm font-medium text-black mb-1">
              Comentario<span className="text-red-500">*</span>
            </label>
            <textarea
              name="comentario"
              id="comentario"
              value={formData.comentario}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4">
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
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Cancelada">Cancelada</option>
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