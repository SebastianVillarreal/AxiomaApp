import { ApiResponse } from "@Models/Response";

export interface BancoInsertRequest
{
    nombre: string;
    direccion: string;
    usuarioActualiza: number;
}

export interface BancoUpdateRequest
{
    id: number;
    nombre: string;
    direccion: string;
    usuarioActualiza: number;
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
