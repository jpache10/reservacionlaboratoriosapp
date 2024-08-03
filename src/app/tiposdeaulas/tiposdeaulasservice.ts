import axios from 'axios';
import { ApiResponse } from './tiposdeaulas';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
});

export const getTipoAulas = async (): Promise<ApiResponse> => {
    const response = await api.get(`/consulta/tipo_aulas`); // Utilizando baseURL directamente

    if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
        throw new Error('Invalid API response format');
    }

    return response.data as ApiResponse;
};