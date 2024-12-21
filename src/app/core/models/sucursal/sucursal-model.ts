
export interface SucursalInsertRequest {
    nombre: string;
    direccion: string;
    idUsuario: number
}

export interface SucursalUpdateRequest extends SucursalInsertRequest {
    id: number;
}

export type GetSucursalResponse = SucursalModel[]
export interface SucursalModel {
    Id: number;
    Nombre: string;
    Direccion: string;
    Usuario: string;
    FechaAct: string;
    FechaReg: string
}
