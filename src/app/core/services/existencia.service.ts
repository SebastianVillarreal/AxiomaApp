import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { existencias } from '@Global/endpoints';
import { GetExistenciaResponse } from '@Models/Existencia';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExistenciaService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  getExistencias(): Observable<GetExistenciaResponse> {
    const httpOptions = { headers: this.headers }
    return this.http.get<GetExistenciaResponse>(existencias.get, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
