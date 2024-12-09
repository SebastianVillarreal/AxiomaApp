import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { entradas } from '@Global/endpoints';
import { EntradaInsertRequest } from '@Models/Entrada';
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

  insertEntrada(entrada: EntradaInsertRequest): Observable<ReturnDataResponse>{
    const httpOptions = { headers: this.headers }
    return this.http.post<ReturnDataResponse>(entradas.insert, entrada, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
