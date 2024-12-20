import { ApiResponse } from "@Models/Response";

export interface CatModuloInsertRequest {
    nombre: string,
    descripcion: string,
    usuario: number
}

export type GetCatModuloResponse = ApiResponse<CatModuloResponseData>

export interface CatModuloResponseData {
    data: CatModuloModel[]
}
export interface CatModuloModel {
    Id: number;
    Nombre: string;
    Descripcion: string;
    FechaRegistro: string;
    FechaActualiza: string;
    Usuario: string;
    Mensaje: string | null
}
