export interface UsuarioInsertRequest {}
export type GetUsuarioResponse = UsuarioModel[]

export interface UsuarioModel {
    Id: string;
    NombreP: string;
    Nombre: string;
    Contrasena: string;
    Rol: string;
    IdPersona: number;
    Usuario: string;
    FechaAct: string;
    FechaReg: string;
    Mensaje: string | null
}
