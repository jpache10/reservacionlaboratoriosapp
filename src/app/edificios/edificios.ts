export interface Edificio {
    EdificioID: number; // Autoincrement, será generado por la base de datos
    Descripcion: string;
    CampusID: number | null; // Puede ser nulo si no está asociado a un campus
    Estado: 'Activo' | 'Inactivo';
    created_at: string;
    updated_at: string;
  }
  
  export interface EdificioPost {
    descripcion: string;
    campusId: number | null;
    estado: 'Activo' | 'Inactivo';
  }
  
  export interface EdificioApiResponse {
    estado: boolean;
    data: Edificio[];
  }
  
  export interface EdificioIDApiResponse {
    estado: boolean;
    data: Edificio;
  }
  