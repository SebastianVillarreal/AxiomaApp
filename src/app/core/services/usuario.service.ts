import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuarios } from '@Global/endpoints';
import { GetUsuarioResponse, UsuarioUpdateRequest } from '@Models/Usuario';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  getUsuarios(): Observable<GetUsuarioResponse>{
    const httpOptions = { headers: this.headers }
    return this.http.get<GetUsuarioResponse>(usuarios.get, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  updateUsuarios(usuario: UsuarioUpdateRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(usuarios.update, usuario, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  deleteUsuario(id: number): Observable<boolean>{
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(usuarios.delete, { id }, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
