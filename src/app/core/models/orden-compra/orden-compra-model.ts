
import { ApiResponse } from "@Models/Response";

export interface OrdenCompraInsertRequest {
    idProveedor: number;
    fechaLlegada: string;
    idSucursal: number;
    idComprador: number;
    usuarioActualiza: number
}

export interface OrdenCompraUpdateRequest {
    idOrden: number;
    idProveedor: number;
    fechaLlegada: Date;
    idSurcursal: number;
    idComprador: number;
    usuarioActualiza: number;
}

export type GetOrdenCompraResponse = ApiResponse<OrdenCompraResponseData>

export interface OrdenCompraResponseData {
    data: OrdenCompraModel[]
}

export interface OrdenCompraModel {
    Id: number;
    IdProveedor: string;
    FechaLlegada: string;
    IdSurcursal: string;
    IdComprador: string;
    FechaRegistro: string;
    UsuarioActualiza: string;
    Total: number;
    Mensaje: string | null;
}
