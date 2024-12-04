import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { proveedores } from '@Global/endpoints';
import { GetProveedorResponse } from '@Models/Proveedor';
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
