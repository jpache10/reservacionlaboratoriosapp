"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getAulas } from "./aulasservice"; // Ajusta el path si es necesario
import { Aula } from "./aula"; // Ajusta el path si es necesario

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && modalRef.current) {
      modalRef.current.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const response = await getAulas();
        setAulas(response.data);
      } catch (error) {
        console.error("Error fetching aulas:", error);
      }
    };

    fetchAulas();
  }, []);

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-gray-700 font-bold mb-5">Aulas</h1>
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <Link href="/" legacyBehavior>
              <a className="text-gray-500 hover:text-gray-700">Dashboard</a>
            </Link>
          </li>
          <li>
            <a className="text-gray-700 font-bold">Aulas</a>
          </li>
        </ul>
      </div>
      <div className="flex justify-between mb-5">
        <Link href="/aulas/registrar" legacyBehavior>
          <a className="btn btn-info font-bold text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Registrar
          </a>
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">#</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Descripción</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Tipo de Aula</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Edificio</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Capacidad</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Cupos Reservados</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Estado</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Opciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {Array.isArray(aulas) &&
              aulas.map((aula, index) => (
                <tr key={aula.AulaID} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{aula.AulaID}</td>
                  <td className="px-6 py-4">{aula.Descripcion}</td>
                  <td className="px-6 py-4">{aula.TipoAulaID}</td>
                  <td className="px-6 py-4">{aula.EdificioID}</td>
                  <td className="px-6 py-4">{aula.Capacidad}</td>
                  <td className="px-6 py-4">{aula.CuposReservados}</td>
                  <td className="px-6 py-4">{aula.Estado}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <a x-data="{ tooltip: 'Delete' }" onClick={openModal}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </a>
                      <a x-data="{ tooltip: 'Edit' }" href={`/aulas/editar/${aula.AulaID}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </a>
                      <a x-data="{ tooltip: 'View' }" href={`/aulas/detalles/${aula.AulaID}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12m-3.75 0a3.75 3.75 0 107.5 0 3.75 3.75 0 00-7.5 0zm-1.25 0A5 5 0 1115 17a5 5 0 01-5-5zm-7.85 0a12.47 12.47 0 0110.71-5.85A12.5 12.5 0 113.9 12z"
                          />
                        </svg>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Listo</h3>
            <p className="py-4">Empleado eliminado con éxito</p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                <Link href="/empleados" legacyBehavior>
                  <a>Cerrar</a>
                </Link>
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
