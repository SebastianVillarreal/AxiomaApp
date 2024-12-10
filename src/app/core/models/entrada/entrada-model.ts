import { ApiResponse } from "@Models/Response";

export interface EntradaInsertRequest {
    idProveedor: number;
    factura: string;
    idSurcursal: number;
    usuarioActualiza: number;
}

export interface EntradaUpdateRequest {
    id: number;
    idProveedor: number;
    factura: string;
    idSurcursal: number;
    fechaEntrega: string,
    usuarioActualiza: number;
    fechaActualiza: string;
}

export type GetEntradaResponse = ApiResponse<EntradaResponseData>

export interface EntradaResponseData {
    data: EntradaModel[]
}

export interface EntradaModel {
    Id: number;
    Proveedor: string;
    Factura: string;
    Surcursal: string;
    FechaEntrega: string;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
    Estatus: number;
    Mensaje: string | null;
}
