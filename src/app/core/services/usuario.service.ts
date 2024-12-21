import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuarios } from '@Global/endpoints';
import { GetUsuarioResponse } from '@Models/Usuario';
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
}
