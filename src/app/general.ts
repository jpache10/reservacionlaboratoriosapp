// interfaces.ts

export interface Aula {
    AulaID: number;
    Descripcion: string;
    TipoAulaID: number | null;
    EdificioID: number | null;
    Capacidad: number;
    CuposReservados: number;
    Estado: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Usuario {
    UsuarioID: number;
    Usuario: string;
    TipoUsuario: string;
    Clave: string;
    Estado: string;
    EmpleadoID: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface Empleado {
    EmpleadoID: number;
    Nombre: string;
    Cedula: string;
    TandaLabor: string;
    FechaIngreso: string;
    CorreoElectronico: string;
    NoCarnet: string;
    Estado: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Reservacion {
    ReservacionID: number;
    EmpleadoID: number;
    AulaID: number;
    UsuarioID: number;
    FechaReservacion: string;
    CantidadHoras: number;
    Comentario: string;
    Estado: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ApiResponse<T> {
    estado: boolean;
    data: T[];
  }
  
  export interface ApiResponseSingle<T> {
    estado: boolean;
    data: T;
  }
  