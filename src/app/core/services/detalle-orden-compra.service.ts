import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detalleOrdenesCompras } from '@Global/endpoints';
import { DetalleOrdenCompraInsertRequest, GetDetalleOrdenCompraResponse } from '@Models/DetalleOrdenCOmpra';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetalleOrdenCompraService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({})
  }

  getDetalleOrdenCompra(idOrdenCompra: number): Observable<GetDetalleOrdenCompraResponse> {
    const httpOptions = {headers: this.headers}
    const url = `${detalleOrdenesCompras.get}?idOrdenCompra=${idOrdenCompra}`
    return this.http.get<GetDetalleOrdenCompraResponse>(url, httpOptions)
    .pipe(
      map(res => {
        return res
      })
    )
  }

  insertDetalleOrdenCompra(detalle: DetalleOrdenCompraInsertRequest): Observable<Boolean> {
    const httpOptions = {headers: this.headers}
    return this.http.post<Boolean>(detalleOrdenesCompras.insert, detalle, httpOptions)
    .pipe(
      map(res =>{
        return res
      })
    )
  }

  
}
