import { ApiResponse } from "@Models/Response";

export type GetProveedorResponse = ApiResponse<ProveedorResponseData>

export interface ProveedorResponseData  {
    data: ProveedorModel[]
}

export interface ProveedorModel {
    Id: number;
    Nombre: string;
    Direccion: string;
    Telefono: string;
    IdBanco: number;
    PlazoPago: number;
    Correo: string;
    RFC: string;
    RazonSocial: string;
    CLABE: string;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
}
