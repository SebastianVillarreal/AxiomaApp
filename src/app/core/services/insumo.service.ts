import { Injectable } from '@angular/core';

//Http
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetInsumoResponse, InsumoInsertRequest, InsumoUpdateRequest } from '@Models/Insumo';
import { insumos } from '@Global/endpoints';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  private headers: HttpHeaders;
  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders({});
  }

  InsertInsumo(insumo: InsumoInsertRequest): Observable<Boolean> {
    const httpOptions = {headers: this.headers}
    return this.http.post<Boolean>(insumos.insert, insumo, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  GetAllInsumos(): Observable<GetInsumoResponse>{
    const httpOptions = {headers: this.headers}
    return this.http.get<GetInsumoResponse>(insumos.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      }
      )
    )
  }

  UpdateInsumo(insumo: InsumoUpdateRequest): Observable<Boolean>{
    const httpOptions = {headers: this.headers}
    return this.http.put<Boolean>(insumos.update, insumo, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
