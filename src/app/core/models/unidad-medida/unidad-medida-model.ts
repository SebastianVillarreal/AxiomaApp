import { ApiResponse } from "@Models/Response";

export type GetUnidadMedidaResponse = UnidadMedidaModel[]

export interface UnidadMedidaModel {
    Id: number;
    Nombre: string;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
}
