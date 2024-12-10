import { ApiResponse } from "@Models/Response";

export interface DetalleEntradaInsertRequest {
    idEntrada: number;
    codigo: string;
    cantidad: number;
    costo: number;
    descuento: number;
    usuarioActualiza: number;
}

export type GetDetalleEntradaResponse = ApiResponse<DetalleEntradaResponseData>
export type GetReporteEntradaResponse = ReporteEntradaModel[]

export interface DetalleEntradaResponseData {
    data: DetalleEntradaModel[]
}

export interface DetalleEntradaModel {
    Id: number;
    IdEntrada: number;
    Codigo: string;
    Articulo: string;
    Cantidad: number;
    Costo: number;
    Descuento: number;
    MontoDescuento: number;
    CantidadSinCargo: number;
    Total: number;
    FechaReg: string;
    FechaAct: string;
    UsuarioAct: string;
    Mensaje: string | null
}


export interface ReporteEntradaModel {
    Id: number;
    Entrada_Ligada: number;
    Codigo: string;
    NombreProveedor: string;
    NombreSucursal: string;
    Cantidad: number;
    Costo: number;
    Descuento: number;
    MontoDescuento: number;
    CanitdadSinCargo: number;
    Total: number;
    Estatus: string;
    UsuarioActualiza: string;
    FechaRegistro: string;
    FechaInicio: string | null;
    FechaFinal: string | null;
}