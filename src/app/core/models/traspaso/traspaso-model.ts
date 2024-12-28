export interface TraspasoInsertRequest {
    idAlmacenOrigen: number;
    idAlmacenDestino: number;
    usuarioEnvia: number;
    usuarioActualiza: number;
}

export interface TraspasoGetRequest {
    pAlmacenOrigen: number;
    pAlmacenDestino: number;
    pFechaInicio: string;
    pFechaFinal: string;
}
export type GetTraspasoResponse = TraspasoModel[]

export interface TraspasoModel {
    Id: number;
    AlmacenOrigen: string;
    AlmacenDestino: string;
    FechaRegistro: string;
    FechaRecibido: string;
    FechaActualiza: string;
    UsuarioEnvia: string;
    UsuarioRecibre: string;
    UsuarioActualiza: string;
    Mensjae: string;
    FechaInicio: string;
    FechaFinal: string;
}
