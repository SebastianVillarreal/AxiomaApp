export interface UnidadMedidaInsertRequest {
    nombre: string;
    usuarioActualiza: number
}

export interface UnidadMedidaUpdateRequest extends UnidadMedidaInsertRequest {
    id: number;
}

export type GetUnidadMedidaResponse = UnidadMedidaModel[]

export interface UnidadMedidaModel {
    Id: number;
    Nombre: string;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
}
