import { ApiResponse } from "@Models/Response";

export type GetRecetaResponse = ApiResponse<RecetaData>;

export interface RecetaData {
    data: RecetaModel[]
}

export interface RecetaModel {
    Id: number;
    Nombre: number;
    FechaCreacion: string;
    FechaActualiza: string;
    UsuarioRegistra: string;
    UsuarioActualiza: string;
    Mensaje: string | null;
}
