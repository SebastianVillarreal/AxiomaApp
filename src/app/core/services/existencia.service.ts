import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { existencias } from '@Global/endpoints';
import { ExistenciaInsertRequest, ExistenciaUpdateRequest, GetExistenciaResponse } from '@Models/Existencia';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExistenciaService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  insertExistencia(existencia: ExistenciaInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.post<boolean>(existencias.insert, existencia, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  updateExistencia(existencia: ExistenciaUpdateRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(existencias.update, existencia, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
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
