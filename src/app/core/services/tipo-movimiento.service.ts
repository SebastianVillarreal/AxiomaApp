import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tipoMovimientos } from '@Global/endpoints';
import { GetTipoMovimientoResponse } from '@Models/TipoMovimiento';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoMovimientoService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({})
  }

  getTiposMovimiento(): Observable<GetTipoMovimientoResponse>{
    const httpOptions = { headers: this.headers }
    return this.http.get<GetTipoMovimientoResponse>(tipoMovimientos.get, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
