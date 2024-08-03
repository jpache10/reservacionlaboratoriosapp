export interface TipoAula {
    TipoAulaID: number;
    Descripcion: string;
    Estado: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ApiResponse {
    estado: boolean;
    data: TipoAula[];
  }
  