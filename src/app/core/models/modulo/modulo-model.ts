import { ApiResponse } from "@Models/Response";

export interface ModuloInsertRequest {
    nombreModulo: string, 
    categoriaModulo: number,
    usuario: number
}

export interface ModuloUpdateRequest extends ModuloInsertRequest {
    id: number
}

export type GetModuloResponseData = ApiResponse<ModuloResponseData>

export interface ModuloResponseData {
    data: ModuloModel[]
}

export interface ModuloModel {
    Id: number;
    Modulo: string;
    CategoriaModulo: string;
    Usuario: string;
    FechaAct: string;
    FechaReg: string;
}
