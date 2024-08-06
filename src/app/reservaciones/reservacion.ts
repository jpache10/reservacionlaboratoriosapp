export interface Reservacion {
    ReservacionID: number; // Autoincrement, será generado por la base de datos
    EmpleadoID: number;
    AulaID: number;
    UsuarioID: number;
    FechaReservacion: string; // formato ISO 8601
    CantidadHoras: number;
    Comentario: string;
    Estado: 'Pendiente' | 'Confirmada' | 'Cancelada';
    created_at: string;
    updated_at: string;
  }
  
  export interface ReservacionPost {
    id_empleado: number;
    id_aula: number;
    fecha_reservacion: string; // formato ISO 8601
    cantidad_hora_ingreso: number;
    comentario: string;
    estado: 'Pendiente' | 'Confirmada' | 'Cancelada';
  }
  
  export interface ReservacionApiResponse {
    estado: boolean;
    data: Reservacion[];
  }
  
  export interface ReservacionIDApiResponse {
    estado: boolean;
    data: Reservacion;
  }  