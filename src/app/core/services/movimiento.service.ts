import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movimientos } from '@Global/endpoints';
import { GetMovimientoResponse, MovimientoInsertRequest } from '@Models/Movimiento';
import { ReturnDataResponse } from '@Models/Response';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  insertMovimiento(movimiento: MovimientoInsertRequest): Observable<ReturnDataResponse>{
    const httpOptions = { headers: this.headers }
    return this.http.post<ReturnDataResponse>(movimientos.insert, movimiento, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  getMovimientos(): Observable<GetMovimientoResponse> {
    const httpOptions = { headers: this.headers }
    return this.http.get<GetMovimientoResponse>(movimientos.get, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  exportMovimientos(): Observable<Blob>{
    const httpOptions = { headers: this.headers, responseType: 'blob' as 'json' }
    return this.http.get<Blob>(movimientos.export, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
