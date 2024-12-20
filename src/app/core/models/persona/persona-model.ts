import { ApiResponse } from "@Models/Response";

export interface PersonaInsertRequest {
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    direccion: string;
    usuario: number;
    pass: string;
}
export interface PersonaUpdateRequest {
    id: number;
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    direccion: string;
    usuario: number;
    sucursal: number;
}
export type GetPersonaRespone = ApiResponse<PersonaResponseData>

export interface PersonaResponseData {
    data: PersonaModel[]
}

export interface PersonaModel {
    Id: number;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
    Usuario: string;
    FechaAct: string;
    FechaReg: string;
    Mensaje: string | null
}
