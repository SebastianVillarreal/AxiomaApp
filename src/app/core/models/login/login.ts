import { ApiResponse } from "@Models/Response";

export interface LoginRequest {
    username: string;
    userpassword: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

interface LoginResponseData {
    data: Data;
}

interface Data {
    Status: boolean;
    Mensaje: string;
    Token: string;
    Usuario: Usuario;
}
  
export interface Usuario {
    Id: number;
    NombreUsuario: string;
    NombrePersona: string;
    IdPerfil: number;
    NombrePerfil: string;
}