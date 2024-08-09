// services/reservacionservice.ts

import axios from 'axios';
import { ReservacionApiResponse, ReservacionIDApiResponse, ReservacionPost } from './reservacion';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
});

// Obtener todas las reservaciones
export const getReservaciones = async (): Promise<ReservacionApiResponse> => {
  const response = await api.get('/reservacion/get_all');
  console.log(response);

  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format');
  }

  return response.data as ReservacionApiResponse;
};

// Obtener una reservación por ID
export const getReservacionById = async (id: number): Promise<ReservacionIDApiResponse> => {
  try {
    const response = await api.get(`/reservacion/get/${id}`);
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Invalid API response format');
    }
    return response.data as ReservacionIDApiResponse;
  } catch (error) {
    console.error('Error fetching reservacion:', error);
    throw error;
  }
}

// Crear una nueva reservación
// Función para formatear la fecha en 'YYYY-MM-DD HH:MM:SS'
const formatMySQLDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const createReservacion = async (reservacion: ReservacionPost): Promise<void> => {
  try {
    // Convertir fecha_reservacion al formato MySQL 'YYYY-MM-DD HH:MM:SS'
    const reservacionData = {
      ...reservacion,
      fecha_reservacion: formatMySQLDateTime(reservacion.fecha_reservacion),
    };

    const response = await api.post('/reservacion/store', reservacionData);
    if (!response.data) {
      throw new Error('Failed to create Reservacion');
    }
  } catch (error) {
    console.error('Error in createReservacion:', error);
    throw error;
  }
};

// Actualizar una reservación existente
export const updateReservacion = async (reservacion: Omit<ReservacionPost, 'id_empleado'> & { id_reservacion: number }): Promise<void> => {
  try {
    const response = await api.post('/reservacion/update', reservacion);
    if (!response.data) {
      throw new Error('Failed to update Reservacion');
    }
  } catch (error) {
    console.error('Error in updateReservacion:', error);
    throw error;
  }
};

// Eliminar una reservación
export const deleteReservacion = async (id_reservacion: number): Promise<void> => {
  console.log(id_reservacion);
  try {
    const response = await api.post('/reservacion/destroy', { id_reservacion });
    if (!response.data) {
      throw new Error('Failed to delete Reservacion');
    }
  } catch (error) {
    console.error('Error deleting Reservacion:', error);
    throw error;
  }
};