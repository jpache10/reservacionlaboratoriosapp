import axios from 'axios';
import { AulaApiResponse, AulaIDApiResponse, Aula, AulaPost } from './aula';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
});

export const getAulas = async (): Promise<AulaApiResponse> => {
  const response = await api.get('/aula/get_all');

  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format');
  }

  return response.data as AulaApiResponse;
};

export const getAulaById = async (id: number): Promise<AulaIDApiResponse> => {
  const response = await api.get(`/aula/get/${id}`);

  if (!response.data || typeof response.data !== 'object') {
    throw new Error('Invalid API response format');
  }

  return response.data as AulaIDApiResponse;
};

export const updateAula = async (aula: AulaPost): Promise<void> => {
  console.log("Datos que se intentan enviar:", aula);

  await api.post('/aula/update', aula);
};

export const deleteAula = async (id: number): Promise<void> => {
  try {
    const response = await api.post('/aula/destroy', { id_aula: id });

    if (!response.data) {
      throw new Error('Failed to delete Aula');
    }
  } catch (error) {
    console.error('Error deleting Aula:', error);
    throw error;
  }
};

export const createAula = async (
  aula: Omit<AulaPost, "Id_aula" | "created_at" | "updated_at">
): Promise<void> => {
  console.log(aula);

  console.log(aula.descripcion);

  try {
    const response = await api.post("/aula/store", aula);
    if (!response.data) {
      throw new Error("Failed to create Aula");
    }
  } catch (error) {
    console.error("Error in createAula:", error);
    throw error;
  }
};
