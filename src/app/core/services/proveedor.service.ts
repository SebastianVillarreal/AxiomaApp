import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { proveedores } from '@Global/endpoints';
import { GetProveedorResponse, ProveedorInsertRequest, ProveedorUpdateRequest } from '@Models/Proveedor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({})
  }

  insertProveedor(proveedor: ProveedorInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.post<boolean>(proveedores.insert, proveedor, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  updateProveedor(proveedor: ProveedorUpdateRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(proveedores.update, proveedor, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  getProveedores(): Observable<GetProveedorResponse> {
    const httpOptions = {headers: this.headers}
    return this.http.get<GetProveedorResponse>(proveedores.get, httpOptions)
    .pipe(
      map(res => {
        return res
      })
    )
  }
}
