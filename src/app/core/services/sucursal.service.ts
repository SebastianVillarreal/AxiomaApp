import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sucursales } from '@Global/endpoints';
import { GetSucursalResponse, SucursalInsertRequest, SucursalUpdateRequest } from '@Models/Sucursal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  insertSucursal(sucursal: SucursalInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.post<boolean>(sucursales.insert, sucursal, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  } 

  updateSucursal(sucursal: SucursalUpdateRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(sucursales.update, sucursal, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  deleteSucursal(id: number): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(sucursales.delete, { id }, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  getSucursales(): Observable<GetSucursalResponse> {
    const httpOptions = {headers: this.headers}
    return this.http.get<GetSucursalResponse>(sucursales.get, httpOptions)
    .pipe(
      map(res => {
        return res
      })
    )
  }
}
