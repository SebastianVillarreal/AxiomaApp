import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detalleMovimientos } from '@Global/endpoints';
import { DetalleMovimientoInsertRequest, DetalleMovimientoUpdateRequest, GetDetalleMovimientoResponse } from '@Models/DetalleMovimiento';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleMovimientoService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  getDetallesMovimiento(idMovimiento: number): Observable<GetDetalleMovimientoResponse> {
    const httpOptions = { headers: this.headers }
    const url = `${detalleMovimientos.get}?idMovimiento=${idMovimiento}`
    return this.http.get<GetDetalleMovimientoResponse>(url, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  insertDetalleMovimiento(detalle: DetalleMovimientoInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.post<boolean>(detalleMovimientos.insert, detalle, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  updateDetalleMovimiento(detalle: DetalleMovimientoUpdateRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(detalleMovimientos.update, detalle, httpOptions)
      .pipe(
        map(res => {
        return res
      }
    ))
  }
}
