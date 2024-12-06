import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ordenesCompras } from '@Global/endpoints';
import { GetOrdenCompraResponse, OrdenCompraInsertRequest } from '@Models/OrdenCompra';
import { ReturnDataResponse } from '@Models/Response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
   }

  getOrdenCompra(): Observable<GetOrdenCompraResponse>{
    const httpOptions = {headers: this.headers}
    return this.http.get<GetOrdenCompraResponse>(ordenesCompras.get, httpOptions)
    .pipe(
      map(res => {
        return res
      })
    )
  }

  insertOrdenCompra(ordenCompra: OrdenCompraInsertRequest): Observable<ReturnDataResponse>{
    const httpOptions = { headers: this.headers }
    return this.http.post<ReturnDataResponse>(ordenesCompras.insert, ordenCompra, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  deleteOrdenCompra(id: number): Observable<Boolean>{
    const httpOptions = { headers: this.headers }
    return this.http.put<Boolean>(ordenesCompras.delete, {id}, httpOptions)
    .pipe(
      map(res => {
        return res
      })
    )
  }
}
