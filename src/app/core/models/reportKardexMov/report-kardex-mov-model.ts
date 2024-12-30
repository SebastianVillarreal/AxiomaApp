export interface ReportGetRequest {
    FechaInicio: string;
    FechaFinal: string;
}

export type GetReporteKardexMovResponse = ReportKardexMovModel[]

export interface ReportKardexMovModel {
    Id: number;
    Movimiento_Ligado: number;
    TipoMovimiento: string;
    Sucursal: string;
    Insumo: string;
    Cantidad: number;
    Estatus: string;
    UsuarioActualiza: string;
    FechaRegistro: string;
    FechaActualiza: string;
    FechaInicio: string;
    FechaFinal: string;
}
