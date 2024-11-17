import { ApiResponse } from "@Models/Response";

export interface BancoInsertRequest
{
    Nombre: string;
    Direcccion: string;
    UsuarioActualiza: number;
}

export type GetBancosResponse = ApiResponse<GetBancosResponseData>;

interface GetBancosResponseData{
    data: BancoModel[];
}
export interface BancoModel {
    Id: number;
    Nombre: string;
    Direccion: string;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
}
