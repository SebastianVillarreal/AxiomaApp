import { ApiResponse } from "@Models/Response";

export interface DetalleTraspasoInsertRequest {
    idTraspaso: number;
    insumo: string;
    cantidadEnviada: number;
    usuarioActualiza: number;
}

export interface DetalleTraspasoUpdateRequest {
    id: number;
    insumo: string;
    cantidadEnviada: number;
    cantidadRecibida: number;
    usuarioActualiza: number;
}

export type GetDetalleTraspasoResponse = ApiResponse<DetalleTraspasoResponseData>

export interface DetalleTraspasoResponseData {
    data: DetalleTraspasoModel[]
}

export interface DetalleTraspasoModel {
    Id: number;
    IdTraspaso: number;
    Insumo: string;
    AlmacenOrigne: string;
    AlmacenDestino: string;
    CantidadEnviada: number;
    CatidadRecibida: number;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
    UsuarioEnvía: string | null;
    UsuarioRecibe: string | null; 
    FechaInicio: string | null;
    FechaFinal: string | null
}
