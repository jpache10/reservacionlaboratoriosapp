// pages/login.tsx

'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      router.push("/"); // Redirige al Dashboard principal
    } else {
      setError(result.message ?? null);
    }
  };

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: "/images/steel-blue-abstract-background-wallpaper-image.jpg')",
      }}
    >
      <div className="absolute inset-0 z-0 opacity-75 bg-gradient-to-b from-[#34CDEA]/90 to-[#348DEA]/80"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
          <div className="self-start hidden lg:flex flex-col text-white">
            <h1 className="mb-3 font-bold text-5xl">Bienvenido </h1>
            <p className="pr-3">
              Bienvenido al Sistema de Reservación de Laboratorios.
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">
                Iniciar sesión
              </h3>
              <p className="text-gray-500">
                Inicie sesión para ingresar en su cuenta.
              </p>
            </div>
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Correo
                </label>
                <input
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="text"
                  placeholder="mail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Contraseña
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-[#0400C0] hover:bg-[#34CDEA] text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2024 UNAPEC
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
