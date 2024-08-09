export interface Empleado {
    EmpleadoID: number; // Autoincrement, será generado por la base de datos
    Nombre: string;
    Cedula: string;
    TandaLabor: 'Mañana' | 'Tarde' | 'Noche';
    FechaIngreso: string; // Date in string format
    CorreoElectronico: string | null;
    NoCarnet: string;
    Estado: 'Activo' | 'Inactivo';
    created_at: string;
    updated_at: string;
  }
  
  export interface EmpleadoPost {
    nombre: string;
    cedula: string;
    tandaLabor: 'Mañana' | 'Tarde' | 'Noche';
    fechaIngreso: string; // Date in string format
    correoElectronico?: string;
    noCarnet: string;
    estado: 'Activo' | 'Inactivo';
  }
  
  export interface EmpleadoApiResponse {
    estado: boolean;
    data: Empleado[];
  }
  
  export interface EmpleadoIDApiResponse {
    estado: boolean;
    data: Empleado;
  }
  