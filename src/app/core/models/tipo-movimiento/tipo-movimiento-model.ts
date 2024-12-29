export type GetTipoMovimientoResponse = TipoMovimientoModel[]

export interface TipoMovimientoModel {
    Id: number;
    Descripcion: string;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
}
