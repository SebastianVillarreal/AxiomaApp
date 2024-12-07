import { ApiResponse } from "@Models/Response";

export interface DetalleOrdenCompraInsertRequest {
    idOrdenCompra: number;
    insumo: string;
    cantidad: number;
    usuarioActualiza: number;
}

export type GetDetalleOrdenCompraResponse = ApiResponse<DetalleOrdenCOmpraResponseData>

export interface DetalleOrdenCOmpraResponseData {
    data: DetalleOrdenCompraModel[]
}

export interface DetalleOrdenCompraModel {
    Id: number;
    IdOrdenCompra: number;
    Insumo: string;
    Cantidad: number;
    CantidadRecibida: number;
    Costo: number;
    CostoRenglon: number;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
    Mensaje: string | null;
}
