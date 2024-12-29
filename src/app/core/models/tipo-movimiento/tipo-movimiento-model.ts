export interface TipoMovimientoInsertRequest {
    descripcion: string;
    usuarioActualiza: number;
}

export type GetTipoMovimientoResponse = TipoMovimientoModel[]

export interface TipoMovimientoModel {
    Id: number;
    Descripcion: string;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
}
