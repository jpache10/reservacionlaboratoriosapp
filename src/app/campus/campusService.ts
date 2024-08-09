// services/campusservice.ts

import axios from 'axios';
import { CampusApiResponse, CampusIDApiResponse, CampusPost } from './campus';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
});

// Obtener todos los campus
export const getCampuses = async (): Promise<CampusApiResponse> => {
  const response = await api.get('/campus/get_all');

  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format');
  }

  return response.data as CampusApiResponse;
};

// Obtener un campus por ID
export const getCampusById = async (id: number): Promise<CampusIDApiResponse> => {
  const response = await api.get(`/campus/get/${id}`);

  if (!response.data || typeof response.data !== 'object') {
    throw new Error('Invalid API response format');
  }

  return response.data as CampusIDApiResponse;
};

// Crear un nuevo campus
export const createCampus = async (campus: CampusPost): Promise<void> => {
  try {
    const response = await api.post('/campus/store', campus);
    if (!response.data || !response.data) {
      throw new Error('Failed to create Campus');
    }
  } catch (error) {
    console.error('Error in createCampus:', error);
    throw error;
  }
};

// Actualizar un campus existente
export const updateCampus = async (campus: Omit<CampusPost, 'estado'> & { CampusID: number }): Promise<void> => {
  try {
    const response = await api.post('/campus/update', campus);
    if (!response.data || !response.data) {
      throw new Error('Failed to update Campus');
    }
  } catch (error) {
    console.error('Error in updateCampus:', error);
    throw error;
  }
};

// Eliminar un campus
export const deleteCampus = async (CampusID: number): Promise<void> => {
  try {
    const response = await api.post('/campus/destroy', { id_campus: CampusID });
    if (!response.data || !response.data) {
      throw new Error('Failed to delete Campus');
    }
  } catch (error) {
    console.error('Error deleting Campus:', error);
    throw error;
  }
};