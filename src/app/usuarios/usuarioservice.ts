// services/usuarioservice.ts

import axios from 'axios';
import { UsuarioApiResponse, UsuarioIDApiResponse, Usuario, UsuarioPost } from './usuario';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
});

// Obtener todos los usuarios
export const getUsuarios = async (): Promise<UsuarioApiResponse> => {
  const response = await api.get('/usuario/get_all');

  if (!response.data || typeof response.data !== 'object' || !('estado' in response.data) || !('data' in response.data)) {
    throw new Error('Invalid API response format');
  }

  return response.data as UsuarioApiResponse;
};

// Obtener un usuario por ID
export const getUsuarioById = async (id: number): Promise<UsuarioIDApiResponse> => {
  console.log(id); 
  const response = await api.get(`/usuario/get/${id}`);
  console.log(response);

  if (!response.data || typeof response.data !== 'object') {
    throw new Error('Invalid API response format');
  }

  return response.data as UsuarioIDApiResponse;
};

// Crear un nuevo usuario
export const createUsuario = async (usuario: UsuarioPost): Promise<void> => {

  console.log(usuario);

  try {
    const response = await api.post('/usuario/store', usuario);
    if (!response.data || !response.data) {
      throw new Error('Failed to create Usuario');
    }
  } catch (error) {
    console.error('Error in createUsuario:', error);
    throw error;
  }
};

// Actualizar un usuario existente
export const updateUsuario = async (usuario: Omit<UsuarioPost, 'Clave'> & { UsuarioID: number }): Promise<void> => {
  try {
    const response = await api.post('/usuario/update', usuario);
    if (!response.data || !response.data) {
      throw new Error('Failed to update Usuario');
    }
  } catch (error) {
    console.error('Error in updateUsuario:', error);
    throw error;
  }
};

// Actualizar la contraseña de un usuario
export const updateUsuarioPassword = async (UsuarioID: number, Clave: string): Promise<void> => {
  try {
    const response = await api.post('/usuario/update_password', { id_usuario: UsuarioID, clave: Clave });
    if (!response.data || !response.data) {
      throw new Error('Failed to update Usuario password');
    }
  } catch (error) {
    console.error('Error in updateUsuarioPassword:', error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUsuario = async (UsuarioID: number): Promise<void> => {
  try {
    const response = await api.post('/usuario/destroy', { id_usuario: UsuarioID });
    if (!response.data || !response.data) {
      throw new Error('Failed to delete Usuario');
    }
  } catch (error) {
    console.error('Error deleting Usuario:', error);
    throw error;
  }
};
