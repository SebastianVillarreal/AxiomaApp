import { ApiResponse } from "@Models/Response";

export interface RecetaInsertRequest {
    nombre: string;
    usuarioRegistra: number;
    usuarioActualiza: number;
}

export interface RecetaUpdateRequest {
    id: number;
    nombre: string;
    usuarioActualiza: number;
}

export type RecetaInsertResponse = ApiResponse<{data: number, Msg: string}>

export type GetRecetaResponse = ApiResponse<RecetaData>;

export interface RecetaData {
    data: RecetaModel[]
}

export interface RecetaModel {
    Id: number;
    Nombre: string;
    FechaCreacion: string;
    FechaActualiza: string;
    UsuarioRegistra: string;
    UsuarioActualiza: string;
    Mensaje: string | null;
}
