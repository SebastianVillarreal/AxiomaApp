import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { entradas } from '@Global/endpoints';
import { EntradaInsertRequest, GetEntradaResponse } from '@Models/Entrada';
import { ReturnDataResponse } from '@Models/Response';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }

  getEntrada(): Observable<GetEntradaResponse>{
    const httpOptions = { headers: this.headers }
    return this.http.get<GetEntradaResponse>(entradas.get, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  insertEntrada(entrada: EntradaInsertRequest): Observable<ReturnDataResponse>{
    const httpOptions = { headers: this.headers }
    return this.http.post<ReturnDataResponse>(entradas.insert, entrada, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  deleteEntrada(id: number): Observable<boolean>{
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(entradas.delete, { id }, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
