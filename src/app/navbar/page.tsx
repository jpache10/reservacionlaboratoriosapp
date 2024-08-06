// components/Navbar.tsx

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" legacyBehavior>
          <a className="text-xl font-bold text-gray-800">Admin Dashboard</a>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/profile" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">Perfil</a>
          </Link>
          <Link href="/settings" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">Configuraciones</a>
          </Link>
          <button className="text-red-600 hover:text-red-800">Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  );
}
