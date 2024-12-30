import { Type } from "@angular/core";
import { ApiResponse } from "@Models/Response";

export interface MovimientoInsertRequest {
    idAlmacen: number;
    tipoMovimiento: number;
    usuarioRegistra: number;
    usuarioAutoriza: number;
    usuarioActualiza: number;
}

export type GetMovimientoResponse = ApiResponse<MovimientoResponseData>

export interface MovimientoResponseData {
    data: DataResponse
}

export interface DataResponse {
    Status: boolean;
    Mensaje: string;
    Movimientos: MovimientoModel[]
}

export interface MovimientoModel {
    Id: number;
    NombreAlmacen: string;
    TipoMovimiento: string;
    FechaCreacion: string;
    FechaAutorizacion: string;
    UsuarioRegistra: string;
    UsuarioAutoriza: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
    Mensaje: string;
}
