"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getReservaciones, deleteReservacion } from "./reservacionservice";
import { Reservacion } from "./reservacion";

export default function ReservacionesPage() {
  const [reservaciones, setReservaciones] = useState<Reservacion[]>([]);
  const [sortedReservaciones, setSortedReservaciones] = useState<Reservacion[]>([]);
  const [selectedReservacion, setSelectedReservacion] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Abrir modal de confirmación
  const openModal = (reservacionId: number) => {
    setSelectedReservacion(reservacionId);
    setIsModalOpen(true);
  };

  // Cerrar modal de confirmación
  const closeModal = () => {
    setSelectedReservacion(null);
    setIsModalOpen(false);
  };

  // Manejar eliminación de reservación
  const handleDelete = async () => {
    if (selectedReservacion === null) return;

    try {
      await deleteReservacion(selectedReservacion);
      setReservaciones((prevReservaciones) =>
        prevReservaciones.filter((reservacion) => reservacion.ReservacionID !== selectedReservacion)
      );
      setSortedReservaciones((prevReservaciones) =>
        prevReservaciones.filter((reservacion) => reservacion.ReservacionID !== selectedReservacion)
      );
      closeModal();
    } catch (error) {
      console.error("Error eliminando la reservación:", error);
      alert("Hubo un problema al intentar eliminar la reservación. Por favor, intenta de nuevo.");
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

  // Obtener lista de reservaciones al montar el componente
  useEffect(() => {
    const fetchReservaciones = async () => {
      try {
        const response = await getReservaciones();
        setReservaciones(response.data);
        setSortedReservaciones(response.data);
      } catch (error) {
        console.error("Error obteniendo las reservaciones:", error);
      }
    };

    fetchReservaciones();
  }, []);

  // Función para formatear la fecha
  const formatFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    const opcionesFecha = { day: "2-digit", month: "2-digit", year: "numeric" } as const;
    const opcionesHora = { hour: "2-digit", minute: "2-digit" } as const;

    const fechaFormateada = fecha.toLocaleDateString("es-ES", opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString("es-ES", opcionesHora);

    return `${fechaFormateada} ${horaFormateada}`;
  };

  // Ordenar las reservaciones
  const sortReservaciones = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const ordenado = [...sortedReservaciones].sort((a, b) => {
      if (key === "FechaReservacion") {
        return direction === "asc"
          ? new Date(a.FechaReservacion).getTime() - new Date(b.FechaReservacion).getTime()
          : new Date(b.FechaReservacion).getTime() - new Date(a.FechaReservacion).getTime();
      } else if (key === "Estado") {
        return direction === "asc" ? a.Estado.localeCompare(b.Estado) : b.Estado.localeCompare(a.Estado);
      }
      return 0;
    });

    setSortedReservaciones(ordenado);
    setSortConfig({ key, direction });
  };

  // Determinar la dirección del ícono de ordenamiento
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return "▲▼";
    }
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  // Generar reporte en formato CSV
  const generarReporteCSV = () => {
    const headers = ["ID", "Código Empleado", "Número del Aula", "Fecha", "Horas", "Estado"];
    const rows = sortedReservaciones.map(reservacion => [
      reservacion.ReservacionID,
      reservacion.EmpleadoID,
      reservacion.AulaID,
      formatFecha(reservacion.FechaReservacion),
      reservacion.CantidadHoras,
      reservacion.Estado
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "reporte_reservaciones.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generar reporte en formato PDF usando la función de impresión del navegador
  const generarReportePDF = () => {
    if (pdfRef.current) {
      const printContents = pdfRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Para recargar la página y restaurar los elementos interactivos
    }
  };

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-gray-700 font-bold mb-5">Reservaciones</h1>
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <Link href="/" legacyBehavior>
              <a className="text-gray-500 hover:text-gray-700">Dashboard</a>
            </Link>
          </li>
          <li>
            <a className="text-gray-700 font-bold">Reservaciones</a>
          </li>
        </ul>
      </div>
      <div className="flex justify-between mb-5">
        <div>
          <button className="btn btn-info font-bold">
            <Link href="/reservaciones/registrar" legacyBehavior>
              <a className="text-white">Registrar</a>
            </Link>
          </button>
        </div>

      </div>
      <div ref={pdfRef} className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                ID
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Código Empleado
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Número del Aula
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 cursor-pointer"
                onClick={() => sortReservaciones("FechaReservacion")}
              >
                Fecha {getSortIcon("FechaReservacion")}
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Horas
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 cursor-pointer"
                onClick={() => sortReservaciones("Estado")}
              >
                Estado {getSortIcon("Estado")}
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {sortedReservaciones.map((reservacion) => (
              <tr key={reservacion.ReservacionID} className="hover:bg-gray-50">
                <td className="px-6 py-4">{reservacion.ReservacionID}</td>
                <td className="px-6 py-4">{reservacion.EmpleadoID}</td>
                <td className="px-6 py-4">{reservacion.AulaID}</td>
                <td className="px-6 py-4">{formatFecha(reservacion.FechaReservacion)}</td>
                <td className="px-6 py-4">{reservacion.CantidadHoras}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${reservacion.Estado === "Confirmada"
                        ? "bg-green-50 text-green-600"
                        : reservacion.Estado === "Pendiente"
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-red-50 text-red-600"
                      }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${reservacion.Estado === "Confirmada"
                          ? "bg-green-600"
                          : reservacion.Estado === "Pendiente"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                    ></span>
                    {reservacion.Estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button onClick={() => openModal(reservacion.ReservacionID)}>
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
                    <a href={`/reservaciones/editar/${reservacion.ReservacionID}`}>
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
                    <a href={`/reservaciones/detalles/${reservacion.ReservacionID}`}>
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

      <div className="my-4 ">
        <button className="btn btn-neutral  ml-4" onClick={generarReporteCSV}>
          Generar Reporte CSV
        </button>
        <button className="btn btn-neutral ml-4" onClick={generarReportePDF}>
          Generar Reporte PDF
        </button>
      </div>

      <div>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmación de Eliminación</h3>
            <p className="py-4">
              ¿Estás seguro que deseas eliminar esta reservación?
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