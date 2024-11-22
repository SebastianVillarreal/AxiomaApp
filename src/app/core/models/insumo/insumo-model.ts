import { ApiResponse } from "@Models/Response";

export interface InsumoUpdateRequest {
    id: number;
    insumo: string;
    descripcionInsumo: string;
    costo: number;
    unidadMedida: number;
    usuarioActualiza: number;
    insumosUP: string;
}

export interface InsumoInsertRequest {
    insumo: string;
    descripcionInsumo: string;
    costo: number;
    unidadMedida: number;
    usuarioActualiza: number;
    insumosUP: string;
}

export type GetInsumoResponse = ApiResponse<InsumoResponseData>;

export interface InsumoResponseData {
    data: InsumoModel[];
}

export interface InsumoModel {
    Id: number;
    Insumo: string;
    Descripcion: string;
    Costo: number;
    UnidadMedida: string;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
    InsumosUP: string;
}
