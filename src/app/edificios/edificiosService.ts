// services/edificioservice.ts

import axios from 'axios';
import { EdificioApiResponse, EdificioIDApiResponse, EdificioPost } from './edificios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
});

// Obtener todos los edificios
export const getEdificios = async (): Promise<EdificioApiResponse> => {
    const response = await api.get('/edificio/get_all');
    console.log(response);

  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format');
  }

  return response.data as EdificioApiResponse;
};

// Obtener un edificio por ID
export const getEdificioById = async (id: number): Promise<EdificioIDApiResponse> => {
  const response = await api.get(`/edificio/get/${id}`);

  if (!response.data || typeof response.data !== 'object') {
    throw new Error('Invalid API response format');
  }

  return response.data as EdificioIDApiResponse;
};

// Crear un nuevo edificio
export const createEdificio = async (edificio: EdificioPost): Promise<void> => {
  try {
    const response = await api.post('/edificio/store', edificio);
    if (!response.data || !response.data) {
      throw new Error('Failed to create Edificio');
    }
  } catch (error) {
    console.error('Error in createEdificio:', error);
    throw error;
  }
};

// Actualizar un edificio existente
export const updateEdificio = async (edificio: Omit<EdificioPost, 'estado'> & { EdificioID: number }): Promise<void> => {
  try {
    const response = await api.post('/edificio/update', edificio);
    if (!response.data || !response.data) {
      throw new Error('Failed to update Edificio');
    }
  } catch (error) {
    console.error('Error in updateEdificio:', error);
    throw error;
  }
};

// Eliminar un edificio
export const deleteEdificio = async (EdificioID: number): Promise<void> => {
  try {
    const response = await api.post('/edificio/destroy', { id_edificio: EdificioID });
    if (!response.data || !response.data) {
      throw new Error('Failed to delete Edificio');
    }
  } catch (error) {
    console.error('Error deleting Edificio:', error);
    throw error;
  }
};