import { ApiResponse } from "@Models/Response";

export interface BancoInsertRequest
{
    Nombre: string;
    Direcccion: string;
    UsuarioActualiza: number;
}

export type GetBancosResponse = ApiResponse<BancoModel[]>;

export interface BancoModel {
    Id: number;
    Nombre: string;
    Direcccion: string;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
}
