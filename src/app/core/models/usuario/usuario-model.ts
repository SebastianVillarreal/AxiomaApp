export interface UsuarioUpdateRequest {
    id: number;
    contrasena: string;
    usuario: number
}

export type GetUsuarioResponse = UsuarioModel[]

export interface UsuarioModel {
    Id: number;
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
