"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewClassroomForm() {
  const [formData, setFormData] = useState({
    description: "Centro de emprendimiento",
    capacity: 10,
    reservedSpots: 5,
    roomType: "Laboratorio",
    building: "Edif. 5",
    status: "Activo",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "capacity" || name === "reservedSpots" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      description: "",
      capacity: 0,
      reservedSpots: 0,
      roomType: "",
      building: "",
      status: "",
    });
  };

  return (
    <div className="ml-5 mt-5">
      <h1 className="text-3xl text-black font-bold mb-5">Aulas</h1>
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <Link href="/aulas" legacyBehavior>
              <a className="text-gray-500 hover:text-black">Aulas</a>
            </Link>
          </li>
          <li>
            <a className="text-black font-bold">Registrar</a>
          </li>
        </ul>
      </div>
      <div className="mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Nueva Aula</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-black mb-1">
              Descripción<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="capacity" className="block text-sm font-medium text-black mb-1">
              Capacidad<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="capacity"
              id="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reservedSpots" className="block text-sm font-medium text-black mb-1">
              Cupos reservados<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="reservedSpots"
              id="reservedSpots"
              value={formData.reservedSpots}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-black mb-1">
                Tipo de Aula<span className="text-red-500">*</span>
              </label>
              <select
                name="roomType"
                id="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
                required
              >
                <option value="Laboratorio">Laboratorio</option>
                <option value="Conferencia">Conferencia</option>
                <option value="Taller">Taller</option>
              </select>
            </div>
            <div>
              <label htmlFor="building" className="block text-sm font-medium text-black mb-1">
                Edificio<span className="text-red-500">*</span>
              </label>
              <select
                name="building"
                id="building"
                value={formData.building}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
                required
              >
                <option value="Edif. 1">Edif. 1</option>
                <option value="Edif. 2">Edif. 2</option>
                <option value="Edif. 3">Edif. 3</option>
                <option value="Edif. 4">Edif. 4</option>
                <option value="Edif. 5">Edif. 5</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="status" className="block text-sm font-medium text-black mb-1">
              Estado<span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
              required
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="flex justify-center">
            <div className="flex justify-between text-sm mt-5">
              <button
                type="submit"
                className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal"
              >
                CREAR
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn mr-2 btn-active btn-ghost text-black font-normal"
              >
                BORRAR DATOS
              </button>
              <button
                type="button"
                className="btn btn-active btn-ghost text-black font-normal"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </form>
      </div></div>
  );
}
