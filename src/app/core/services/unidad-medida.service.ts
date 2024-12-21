import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { unidadesMedidas } from '@Global/endpoints';
import { GetUnidadMedidaResponse } from '@Models/UnidadMedida';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  getUnidadesMedidas(): Observable<GetUnidadMedidaResponse> {
    const httpOptions = { headers: this.headers }
    return this.http.get<GetUnidadMedidaResponse>(unidadesMedidas.get, httpOptions)
      .pipe(
        map(res => {
          return res
        })
      )
  }
}
