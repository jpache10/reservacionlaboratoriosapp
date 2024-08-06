// services/reservacionservice.ts

import axios from 'axios';
import { ReservacionApiResponse, ReservacionIDApiResponse, ReservacionPost } from './reservacion';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
});

// Obtener todas las reservaciones
export const getReservaciones = async (): Promise<ReservacionApiResponse> => {
  const response = await api.get('/reservacion/get_all');

  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format');
  }

  return response.data as ReservacionApiResponse;
};

// Obtener una reservación por ID
export const getReservacionById = async (id: number): Promise<ReservacionIDApiResponse> => {
  const response = await api.get(`/reservacion/get/${id}`);

  if (!response.data || typeof response.data !== 'object') {
    throw new Error('Invalid API response format');
  }

  return response.data as ReservacionIDApiResponse;
};

// Crear una nueva reservación
export const createReservacion = async (reservacion: ReservacionPost): Promise<void> => {
  try {
    const response = await api.post('/reservacion/store', reservacion);
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