import { ApiResponse } from "@Models/Response";

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
    CantidadRecibida: number;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
    UsuarioEnvía: string | null;
    UsuarioRecibe: string | null; 
    FechaInicio: string | null;
    FechaFinal: string | null
}
