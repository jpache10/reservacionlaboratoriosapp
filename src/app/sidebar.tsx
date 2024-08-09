"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { getCurrentUser } from './account/authService';
import { Usuario } from "./general";

export default function Sidebar() {
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchCurrentUser = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    window.addEventListener("storage", fetchCurrentUser);
    fetchCurrentUser();
    return () => {
      window.removeEventListener("storage", fetchCurrentUser);
    };
  }, []);

  return (
    <aside className="flex flex-col min-h-screen w-64 px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-blue-700 dark:border-gray-700">
      <Link href="/" legacyBehavior>
        <a className="text-2xl text-white font-bold">Laboratorios</a>
      </Link>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            {!user ? (
              <Link href="/account/login" legacyBehavior>
                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9M9 12.75v6.75a2.25 2.25 0 002.25 2.25h1.5A2.25 2.25 0 0015 19.5v-6.75M12 12.75v6.75"
                    />
                  </svg>
                  <span className="mx-2 text-sm font-medium">Iniciar sesión</span>
                </a>
              </Link>
            ) : (
              <>
                <Link href="/" legacyBehavior>
                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4h16v2H4V4zM4 9h16v2H4V9zM4 14h16v2H4v-2zM4 19h16v2H4v-2z"
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Dashboard</span>
                  </a>
                </Link>

                <Link href="/usuarios" legacyBehavior>
                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM6.75 17.25a7.5 7.5 0 0110.5 0"
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Usuarios</span>
                  </a>
                </Link>

                <Link href="/reservaciones" legacyBehavior>
                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25a.75.75 0 01.75-.75h6a.75.75 0 01.75.75V9m-7.5 0h7.5m-7.5 0A2.25 2.25 0 006 11.25v7.5A2.25 2.25 0 008.25 21h7.5A2.25 2.25 0 0018 18.75v-7.5A2.25 2.25 0 0015.75 9m-7.5 0V7.5m7.5 0V9"
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Reservaciones</span>
                  </a>
                </Link>

                <Link href="/empleados" legacyBehavior>
                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 7.5c0 1.518-1.232 2.75-2.75 2.75S10.25 9.018 10.25 7.5 11.482 4.75 13 4.75s2.75 1.232 2.75 2.75zM15.75 7.5v.125c0 1.57 1.28 2.845 2.85 2.87 1.57.025 2.85 1.3 2.85 2.87v1.875c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125V13.36c0-1.57 1.28-2.845 2.85-2.87 1.57-.025 2.85-1.3 2.85-2.87V7.5M18.5 10.5V11c0 .69-.56 1.25-1.25 1.25h-9.5C7.56 12.25 7 11.69 7 11v-.5M12 21v-2m0-6v2m0 4h2.25M15 21h-3m3 0h2.25"
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Empleados</span>
                  </a>
                </Link>

                <Link href="/tiposdeaulas" legacyBehavior>
                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25v7.5a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-7.5m18-2.25H3m18 0H3m0 0V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v.75M4.5 8.25h15M6 12.75h12m-9 3h6"
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Tipos de Aulas</span>
                  </a>
                </Link>

                <Link href="/aulas" legacyBehavior>
                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v18m4.5-18v18m4.5-18v18M3 8.25h18m-18 7.5h18"
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Aulas</span>
                  </a>
                </Link>

                <Link href="/campus" legacyBehavior>
                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2.25L3.75 8.25l8.25 6 8.25-6L12 2.25zm0 17.25v4.5m-8.25-9v4.5M8.25 21v-7.5M15.75 21v-7.5m4.5 9v-4.5"
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Campus</span>
                  </a>
                </Link>

                <Link href="/edificios" legacyBehavior>
                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 9.75h18M3 14.25h18M9.75 4.5v15m4.5-15v15m-7.5-15H3v18h18v-18H3.75zM3.75 2.25v18m16.5-18v18"
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Edificios</span>
                  </a>
                </Link>

                <Link href="/reportes" legacyBehavior>
                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3v16.5a1.5 1.5 0 001.5 1.5h14.25a1.5 1.5 0 001.5-1.5V3M3.75 9.75h16.5M9.75 21V12.75M14.25 21V12.75"
                      />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Reportes</span>
                  </a>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}