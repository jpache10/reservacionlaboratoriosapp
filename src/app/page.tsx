"use client";
import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { getAulas, getUsuarios, getEmpleados, getReservaciones } from "./service";
import { Aula, Usuario, Empleado, Reservacion } from "./general";
import Navbar from './navbar/page'; // Componente Navbar
import { getCurrentUser, logout } from "./account/authService"; // Importar funciones de autenticación
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [aulas, setAulas] = useState<number>(0);
  const [usuarios, setUsuarios] = useState<number>(0);
  const [empleados, setEmpleados] = useState<number>(0);
  const [reservaciones, setReservaciones] = useState<number>(0);
  const [reservacionesData, setReservacionesData] = useState<Reservacion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      router.push("/login"); // Redirige al login si no hay un usuario autenticado
    }

    async function fetchData() {
      try {
        const aulasResponse = await getAulas();
        const usuariosResponse = await getUsuarios();
        const empleadosResponse = await getEmpleados();
        const reservacionesResponse = await getReservaciones();

        setAulas(aulasResponse.data.length);
        setUsuarios(usuariosResponse.data.length);
        setEmpleados(empleadosResponse.data.length);
        setReservaciones(reservacionesResponse.data.length);
        setReservacionesData(reservacionesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Hubo un problema al cargar los datos. Por favor, intenta de nuevo más tarde.");
      }
    }

    fetchData();
  }, [router]);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/acccount/login");
  };

  // Datos dinámicos para gráficos
  const lineData = reservacionesData.map((reservacion) => ({
    name: new Date(reservacion.FechaReservacion).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
    value: reservacion.CantidadHoras,
  }));

  const barData = [
    { name: 'Usuarios', count: usuarios },
    { name: 'Empleados', count: empleados },
    { name: 'Aulas', count: aulas },
    { name: 'Reservaciones', count: reservaciones },
  ];

  const pieData = [
    { name: 'Confirmada', value: reservacionesData.filter(r => r.Estado === 'Confirmada').length },
    { name: 'Pendiente', value: reservacionesData.filter(r => r.Estado === 'Pendiente').length },
    { name: 'Cancelada', value: reservacionesData.filter(r => r.Estado === 'Cancelada').length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Ejemplo de actividades recientes
  const recentActivities = [
    { id: 1, action: 'Usuario registrado: Maria López', time: '2024-08-05 10:30 AM' },
    { id: 2, action: 'Nueva reservación: Sala de Conferencias 505', time: '2024-08-05 11:00 AM' },
    { id: 3, action: 'Usuario actualizado: Juan Pérez', time: '2024-08-04 02:00 PM' },
    { id: 4, action: 'Reservación cancelada: Laboratorio de Computación 202', time: '2024-08-03 01:00 PM' },
  ];

  return (
    <main className="flex flex-row">
      <div className="flex-1">
        <Navbar />
        <div className="p-8 bg-gray-100 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            {user ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-800">Bienvenido, {user.name}</h2>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <h2 className="text-2xl font-semibold text-gray-800">No estás autenticado</h2>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800">Aulas</h2>
              <p className="text-3xl font-bold text-gray-600">{aulas}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800">Usuarios</h2>
              <p className="text-3xl font-bold text-gray-600">{usuarios}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800">Empleados</h2>
              <p className="text-3xl font-bold text-gray-600">{empleados}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800">Reservaciones</h2>
              <p className="text-3xl font-bold text-gray-600">{reservaciones}</p>
            </div>
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Horas de Reservaciones</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Conteo de Entidades</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de Reservaciones</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Panel de Actividades Recientes */}
          <div className="bg-white shadow rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Actividades Recientes</h3>
            <ul className="space-y-2">
              {recentActivities.map(activity => (
                <li key={activity.id} className="text-gray-600">
                  <span className="font-medium">{activity.action}</span>
                  <span className="text-sm text-gray-500"> - {activity.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
