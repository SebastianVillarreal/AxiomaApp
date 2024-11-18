import { ApiResponse } from "@Models/Response";

export type GetArticulosResponse = ApiResponse<GetArticulosResponseData>;

export interface GetArticulosResponseData{
    data: ArticuloModel[];
}

export interface ArticuloModel {
    Id: number;
    Codigo: string;
    Descripcion: string;
    Familia: string;
    UM: string;
    UltimoCosto: string;
    PrecioVenta: string;
    Iva: string;
    Ieps: string;
    Usuario: string;
    FechaAct: string;
    FechaReg: string;
}
