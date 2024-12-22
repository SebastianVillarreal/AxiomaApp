import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { unidadesMedidas } from '@Global/endpoints';
import { GetUnidadMedidaResponse, UnidadMedidaInsertRequest, UnidadMedidaUpdateRequest } from '@Models/UnidadMedida';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }

  insertUnidadMedida(um: UnidadMedidaInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.post<boolean>(unidadesMedidas.insert, um, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  updateUnidadMedida(um: UnidadMedidaUpdateRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(unidadesMedidas.update, um, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  deleteUnidadMedida(id: number): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(unidadesMedidas.delete, { id }, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
  
  getUnidadesMedidas(): Observable<GetUnidadMedidaResponse> {
    const httpOptions = { headers: this.headers }
    return this.http.get<GetUnidadMedidaResponse>(unidadesMedidas.get, httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }
}
