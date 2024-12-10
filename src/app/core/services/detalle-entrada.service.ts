import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detalleEntradas } from '@Global/endpoints';
import { DetalleEntradaInsertRequest } from '@Models/DetalleEntrada';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleEntradaService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  insertDetalleEntrada(detalle: DetalleEntradaInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.post<boolean>(detalleEntradas.insert, detalle, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
