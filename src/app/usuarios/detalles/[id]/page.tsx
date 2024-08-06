// pages/usuarios/detalles/[id].tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getUsuarioById } from "../../usuarioservice"; // Ajusta la ruta según tu estructura
import { Usuario } from "../../usuario"; // Ajusta la ruta según tu estructura

export default function UsuarioDetails() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUsuarioById(Number(id));
        if (response.estado) {
          setUsuario(response.data);
        } else {
          alert("Error al obtener los detalles del usuario.");
        }
      } catch (error) {
        console.error("Error fetching usuario:", error);
        alert("Error al obtener los detalles del usuario.");
      }
    };

    fetchUsuario();
  }, [id]);

  if (!usuario) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">Cargando detalles del usuario...</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
        <div className="flex justify-center mt-6">
          <img
            src={`https://i.pravatar.cc/300?img=${usuario.UsuarioID}`}
            alt={usuario.Usuario}
            className="rounded-full w-32 h-32 border-4 border-gray-200"
          />
        </div>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mt-2">{usuario.Usuario}</h2>
          <p className="text-sm text-gray-500 mt-1">Tipo de Usuario: {usuario.TipoUsuario}</p>
          <p
            className={`mt-2 text-lg font-semibold ${
              usuario.Estado === "Activo" ? "text-green-600" : "text-red-600"
            }`}
          >
            Estado: {usuario.Estado}
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Id de usuario: {usuario.UsuarioID}</p>
            <p className="text-sm text-gray-500">Id de empleado: {usuario.EmpleadoID}</p>
            <p className="text-sm text-gray-500">Fecha de Creación: {new Date(usuario.created_at).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Última Actualización: {new Date(usuario.updated_at).toLocaleDateString()}</p>
          </div>
          <div className="mt-6 flex justify-around">
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 font-normal"
              onClick={() => router.push("/usuarios")}
            >
              Volver
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal"
              onClick={() => router.push(`/usuarios/editar/${usuario.UsuarioID}`)}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
