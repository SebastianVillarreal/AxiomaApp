import { ApiResponse } from "@Models/Response";

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
