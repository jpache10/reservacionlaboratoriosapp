"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="max-w-md ">
      <div className="flex items-center space-x-5">

        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
          <h2 className="leading-relaxed">Registrar un Usuario</h2>
          <p className="text-sm text-gray-500 font-normal leading-relaxed">
            Ingrese los datos para registrar un Usuario nuevo
          </p>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <div className="flex flex-col">
            <label className="leading-loose">Nombre</label>
            <input
              type="text"
              className="px-4 py-2 border focus:ring-gray-500  bg-white focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="Nombre del empleado"
            />
          </div>
          <div className="flex flex-col">
            <label className="leading-loose">Cedula</label>
            <input
              type="text"
              className="px-4 py-2 border focus:ring-gray-500 bg-white  focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="Cedula"
            />
          </div>
          <div className="flex flex-col">
            <label className="leading-loose">No Cardnet</label>
            <input
              type="email"
              className="px-4 py-2 border focus:ring-gray-500 bg-white  focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="Correo electrónico"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
            <label className="leading-loose">Tipo Usuario</label>
            <select className="px-4 py-2 border focus:ring-gray-500 bg-white focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 h-10">
              <option value="">Activo</option>
              <option value="opcion1">Desactivado</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="leading-loose">Estado</label>
            <select className="px-4 py-2 border focus:ring-gray-500  bg-white focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 h-10">
              <option value="">Activo</option>
              <option value="opcion1">Desactivado</option>
            </select>
          </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <label className="leading-loose">Contraseña</label>
              <input
                type="text"
                className="px-4 py-2 border focus:ring-white-500  bg-white focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md bg-white focus:outline-none text-gray-600"
                placeholder="Cedula"
              />
            </div>
            <div className="col-span-1">
              <label className="leading-loose">Confirmar Contraseña</label>
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 bg-white  focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Cedula"
              />
            </div>
          </div></div>
        <div className="pt-4 flex items-center space-x-4">
          <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>{" "}
            <Link href="/" className="btn-danger">Cancelar</Link>
          </button>

          <button
            onClick={openModal}
            className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
          >
            Registrar
          </button>
          <div>
            <dialog ref={modalRef} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Listo</h3>
                <p className="py-4">Empleado registrado con éxito</p>
                <div className="modal-action">
                  <button className="btn" onClick={closeModal}>
                    <Link href="/empleados">Cerrar</Link>
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>

  );
}
