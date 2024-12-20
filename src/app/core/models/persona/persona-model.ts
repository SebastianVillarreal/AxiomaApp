import { ApiResponse } from "@Models/Response";

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
