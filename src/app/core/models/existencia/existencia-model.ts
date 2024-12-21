import { ApiResponse } from "@Models/Response";

export interface ExistenciaInsertRequest {
    insumo: string;
    idAlmacen: number;
    cantidad: number;
    usuarioActualiza: number;
}

export type GetExistenciaResponse = ApiResponse<ExistenciaResponseData>

export interface ExistenciaResponseData {
    data: ExistenciaModel[]
}
export interface ExistenciaModel {
    Id: number;
    Insumo: string;
    IdAlmacen: number;
    Cantidad: number;
    Fecha: string;
    FechaActualiza: string;
    UsuarioActualiza: string
}
