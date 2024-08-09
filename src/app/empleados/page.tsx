"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getEmpleados, deleteEmpleado } from "./empleadoService";
import { Empleado } from "./empleado";

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  // Abrir modal de confirmación
  const openModal = (empleadoId: number) => {
    setSelectedEmpleado(empleadoId);
    setIsModalOpen(true);
  };

  // Cerrar modal de confirmación
  const closeModal = () => {
    setSelectedEmpleado(null);
    setIsModalOpen(false);
  };

  // Manejar eliminación de empleado
  const handleDelete = async () => {
    if (selectedEmpleado === null) return;

    try {
      await deleteEmpleado(selectedEmpleado);
      setEmpleados((prevEmpleados) =>
        prevEmpleados.filter((empleado) => empleado.EmpleadoID !== selectedEmpleado)
      );
      closeModal();
    } catch (error) {
      console.error("Error deleting empleado:", error);
      alert("Error eliminando el empleado. Por favor intenta de nuevo.");
    }
  };

  // Mostrar u ocultar el modal según el estado
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isModalOpen]);

  // Cerrar el modal al cambiar el estado
  useEffect(() => {
    if (!isModalOpen && modalRef.current) {
      modalRef.current.close();
    }
  }, [isModalOpen]);

  // Obtener lista de empleados al montar el componente
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await getEmpleados();
        setEmpleados(response.data);
      } catch (error) {
        console.error("Error fetching empleados:", error);
      }
    };

    fetchEmpleados();
  }, []);

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-gray-700 font-bold mb-5">Empleados</h1>
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <Link href="/" legacyBehavior>
              <a className="text-gray-500 hover:text-gray-700">Dashboard</a>
            </Link>
          </li>
          <li>
            <a className="text-gray-700 font-bold">Empleados</a>
          </li>
        </ul>
      </div>
      <div className="flex justify-between mb-5">
        <button className="btn btn-info font-bold">
          <Link href="/empleados/registrar" legacyBehavior>
            <a className="text-white">Registrar</a>
          </Link>
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                ID
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Nombre
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Cédula
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tanda Laboral
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Estado
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {empleados.map((empleado) => (
              <tr key={empleado.EmpleadoID} className="hover:bg-gray-50">
                <td className="px-6 py-4">{empleado.EmpleadoID}</td>
                <td className="px-6 py-4">{empleado.Nombre}</td>
                <td className="px-6 py-4">{empleado.Cedula}</td>
                <td className="px-6 py-4">{empleado.TandaLabor}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                      empleado.Estado === "Activo"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        empleado.Estado === "Activo" ? "bg-green-600" : "bg-red-600"
                      }`}
                    ></span>
                    {empleado.Estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button onClick={() => openModal(empleado.EmpleadoID!)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <a href={`/empleados/editar/${empleado.EmpleadoID}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </a>
                    <a href={`/empleados/detalles/${empleado.EmpleadoID}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M1.5 12s3-7 10.5-7 10.5 7 10.5 7-3 7-10.5 7S1.5 12 1.5 12z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
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
            <h3 className="font-bold text-lg">Confirmación de Eliminación</h3>
            <p className="py-4">
              ¿Estás seguro que deseas eliminar este empleado?
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>
                Eliminar
              </button>
              <button className="btn" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}