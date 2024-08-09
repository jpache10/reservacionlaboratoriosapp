// pages/reservaciones/detalles/[id].tsx

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Cambiar a useParams
import { getReservacionById } from "../../reservacionservice";
import { Reservacion } from "../../reservacion";
import Link from "next/link";

export default function ReservacionDetails() {
  const { id } = useParams(); // Obtén el ID desde useParams
  const [reservacion, setReservacion] = useState<Reservacion | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchReservacion = async () => {
        try {
          const response = await getReservacionById(Number(id));
          setReservacion(response.data);
        } catch (error) {
          console.error("Error fetching reservacion details:", error);
          setError("No se pudo obtener la información de la reservación.");
        } finally {
          setLoading(false);
        }
      };

      fetchReservacion();
    }
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!reservacion) {
    return <p>No se encontraron detalles para esta reservación.</p>;
  }

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-gray-700 font-bold mb-5">Detalles de la Reservación</h1>
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <Link href="/reservaciones" className="text-gray-500 hover:text-gray-700">
              Reservaciones
            </Link>
          </li>
          <li>
            <span className="text-gray-700 font-bold">Detalles</span>
          </li>
        </ul>
      </div>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Reservación #{reservacion.ReservacionID}</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Empleado ID: {reservacion.EmpleadoID}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Aula ID: {reservacion.AulaID}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Usuario ID: {reservacion.UsuarioID}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Fecha de Reservación: {new Date(reservacion.FechaReservacion).toLocaleString()}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Cantidad de Horas: {reservacion.CantidadHoras}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Comentario: {reservacion.Comentario}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Estado: {reservacion.Estado}</p>
        </div>
        <div className="flex">
            <Link href="/aulas" className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 font-normal">
              Volver
            </Link>
            <Link href="/aulas/editar{ponerid}" className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal">
              Editar
            </Link>
          </div>
      </div>
    </div>
  );
}