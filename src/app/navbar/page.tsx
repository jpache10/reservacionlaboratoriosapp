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
      </div>
    </nav>
  );
}
