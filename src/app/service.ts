// services/apiService.ts

import axios from 'axios';
import { ApiResponse, Aula, Usuario, Empleado, Reservacion } from './general';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL, // Asegúrate de tener esta variable configurada
});

// Obtener todas las aulas
export const getAulas = async (): Promise<ApiResponse<Aula>> => {
  const response = await api.get('/aula/get_all');
  
  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format for aulas');
  }
  
  return response.data as ApiResponse<Aula>;
};

// Obtener todos los usuarios
export const getUsuarios = async (): Promise<ApiResponse<Usuario>> => {
  const response = await api.get('/usuario/get_all');
  
  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format for usuarios');
  }
  
  return response.data as ApiResponse<Usuario>;
};

// Obtener todos los empleados
export const getEmpleados = async (): Promise<ApiResponse<Empleado>> => {
  const response = await api.get('/empleado/get_all');
  
  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format for empleados');
  }
  
  return response.data as ApiResponse<Empleado>;
};

// Obtener todas las reservaciones
export const getReservaciones = async (): Promise<ApiResponse<Reservacion>> => {
  const response = await api.get('/reservacion/get_all');
  
  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format for reservaciones');
  }
  
  return response.data as ApiResponse<Reservacion>;
};
