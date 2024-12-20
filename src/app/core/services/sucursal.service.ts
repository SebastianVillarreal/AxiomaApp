import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sucursales } from '@Global/endpoints';
import { GetSucursalResponse } from '@Models/Sucursal';
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
