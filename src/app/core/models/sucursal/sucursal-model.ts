export type GetSucursalResponse = SucursalModel[]
export interface SucursalModel {
    Id: number;
    Nombre: string;
    Direccion: string;
    Usuario: string;
    FechaAct: string;
    FechaReg: string
}
