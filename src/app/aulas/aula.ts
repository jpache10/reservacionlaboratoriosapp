export interface Aula {
  AulaID?: number; // Es opcional porque es auto_increment y solo estará presente después de crear una nueva aula
  Descripcion: string;
  TipoAulaID: number;
  EdificioID: number;
  Capacidad: number;
  CuposReservados: number;
  Estado: 'Activo' | 'Inactivo';
  created_at: string;
  updated_at: string;
}

export interface AulaPost {
    Id_aula?: number; // Es opcional porque es auto_increment y solo estará presente después de crear una nueva aula
    Descripcion: string;
    Tipo_aula: number;
    Edificio: number;
    Capacidad: number;
    Cupos: number;
    Estado: 'Activo' | 'Inactivo';
    created_at: string;
    updated_at: string;
  }

  export interface AulaApiResponse {
    estado: boolean;
    data: Aula[];
  }
  
  export interface AulaIDApiResponse {
    estado: boolean;
    data: Aula;
  }

 
  