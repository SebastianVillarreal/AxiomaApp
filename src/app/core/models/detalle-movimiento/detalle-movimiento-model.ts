import { ApiResponse } from "@Models/Response";

export interface DetalleMovimientoInsertRequest {
    idMovimiento: number;
    insumo: string;
    cantidad: number;
    usuarioActualiza: number;
}

export interface DetalleMovimientoUpdateRequest {
    id: number;
    insumo: string;
    cantidad: number;
    usuarioActualiza: number;
    estatus: number;
}

export type GetDetalleMovimientoResponse = ApiResponse<DetalleMovimientoResponseData>

export interface DetalleMovimientoResponseData {
    data: DetalleMovimientoModel[]
}

export interface DetalleMovimientoModel {
    Id: number;
    IdMovimiento: number;
    Insumo: string;
    Cantidad: number;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
    Mensaje: string;
}
