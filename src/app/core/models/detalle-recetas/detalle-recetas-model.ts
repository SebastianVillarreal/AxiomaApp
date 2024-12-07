import { ApiResponse } from "@Models/Response";

export interface DetallesRecetaInsertRequest {
   idReceta: number;
   insumo: string;
   cantidad: number;
   usuarioActualiza: number;
}

export type GetDetalleRecetasResponse = ApiResponse<DetalleRecetasResponseData>

export interface DetalleRecetasResponseData {
   data: DetalleRecetasModel[]
}

export interface DetalleRecetasModel {
   Id: number;
   IdReceta: number;
   Insumo: string;
   Descripcion: string;
   Cantidad: number;
   FechaReg: string;
   FechaAct: string;
   UsuarioAct: string
   Mensaje: string | null;
}
