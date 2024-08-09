import axios from 'axios';
import { EmpleadoApiResponse, EmpleadoIDApiResponse, EmpleadoPost } from './empleado';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
});

// Obtener todos los empleados
export const getEmpleados = async (): Promise<EmpleadoApiResponse> => {
  const response = await api.get('/empleado/get_all');

  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format');
  }

  return response.data as EmpleadoApiResponse;
};

// Obtener un empleado por ID
export const getEmpleadoById = async (id: number): Promise<EmpleadoIDApiResponse> => {
  const response = await api.get(`/empleado/get/${id}`);

  if (!response.data || typeof response.data !== 'object') {
    throw new Error('Invalid API response format');
  }

  return response.data as EmpleadoIDApiResponse;
};

// Crear un nuevo empleado
export const createEmpleado = async (empleado: EmpleadoPost): Promise<void> => {
  try {
    const response = await api.post('/empleado/store', empleado);
    if (!response.data) {
      throw new Error('Failed to create Empleado');
    }
  } catch (error) {
    console.error('Error in createEmpleado:', error);
    throw error;
  }
};

// Actualizar un empleado existente
export const updateEmpleado = async (empleado: Omit<EmpleadoPost, 'cedula'> & { EmpleadoID: number }): Promise<void> => {
  try {
    const response = await api.post('/empleado/update', empleado);
    if (!response.data) {
      throw new Error('Failed to update Empleado');
    }
  } catch (error) {
    console.error('Error in updateEmpleado:', error);
    throw error;
  }
};

// Eliminar un empleado
export const deleteEmpleado = async (EmpleadoID: number): Promise<void> => {
  try {
    const response = await api.post('/empleado/destroy', { id_empleado: EmpleadoID });
    if (!response.data) {
      throw new Error('Failed to delete Empleado');
    }
  } catch (error) {
    console.error('Error deleting Empleado:', error);
    throw error;
  }
};
