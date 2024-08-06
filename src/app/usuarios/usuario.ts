export interface Usuario {
  UsuarioID: number; // Autoincrement, será generado por la base de datos
  Usuario: string;
  TipoUsuario: 'Profesor' | 'Estudiante' | 'Empleado' | 'Otro' | 'Administrador';
  Clave: string;
  Estado: 'Activo' | 'Inactivo';
  EmpleadoID: number;
  created_at: string;
  updated_at: string;
}

export interface UsuarioPost {
  usuario: string;
  tipoUsuario: 'Profesor' | 'Estudiante' | 'Empleado' | 'Otro' | 'Administrador';
  clave: string;
  estado: 'Activo' | 'Inactivo';
  id_empleado: number;
}

export interface UsuarioApiResponse {
  estado: boolean;
  data: Usuario[];
}

export interface UsuarioIDApiResponse {
  estado: boolean;
  data: Usuario;
}
