export interface Campus {
    CampusID: number; // Autoincrement, será generado por la base de datos
    Descripcion: string;
    Estado: 'Activo' | 'Inactivo';
    created_at: string;
    updated_at: string;
  }
  
  export interface CampusPost {
    descripcion: string;
    estado: 'Activo' | 'Inactivo';
  }
  
  export interface CampusApiResponse {
    estado: boolean;
    data: Campus[];
  }
  
  export interface CampusIDApiResponse {
    estado: boolean;
    data: Campus;
  }  