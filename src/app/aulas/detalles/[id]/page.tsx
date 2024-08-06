"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { getAulaById } from "../../aulasservice";
import { Aula } from "../../aula";
import Link from "next/link";

export default function Page() {
  const { id } = useParams();
  const [aula, setAula] = useState<Aula | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAula = async () => {
      if (id) {
        try {
          const fetchedAula = await getAulaById(Number(id));
          setAula(fetchedAula.data);
          console.log(fetchedAula.data); // Verifica qué se está recibiendo
        } catch (error) {
          console.error("Error fetching aula:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAula();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl text-gray-700 font-bold mb-5">Detalles del Aula</h1>
      {aula ? (
        <div className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Descripción:</label>
            <p className="mt-1 block w-full bg-gray-100 p-2 rounded">{aula.Descripcion}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Tipo de Aula:</label>
            <p className="mt-1 block w-full bg-gray-100 p-2 rounded">{aula.TipoAulaID}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Edificio:</label>
            <p className="mt-1 block w-full bg-gray-100 p-2 rounded">{aula.EdificioID}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Capacidad:</label>
            <p className="mt-1 block w-full bg-gray-100 p-2 rounded">{aula.Capacidad}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Cupos Reservados:</label>
            <p className="mt-1 block w-full bg-gray-100 p-2 rounded">{aula.CuposReservados}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Estado:</label>
            <p className="mt-1 block w-full bg-gray-100 p-2 rounded">{aula.Estado}</p>
          </div>
          <div className="flex justify-between">
            <Link href="/aulas" className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 font-normal">
              Volver
            </Link>
          </div>
        </div>

        
      ) : (
        <div className="text-red-500">No se encontró el aula.</div>
      )}

    </div>
  );
}
