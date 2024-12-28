import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { traspasos } from '@Global/endpoints';
import { ReturnDataResponse } from '@Models/Response';
import { GetTraspasoResponse, TraspasoGetRequest, TraspasoInsertRequest } from '@Models/Traspaso';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraspasoService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  insertTraspaso(traspaso: TraspasoInsertRequest): Observable<ReturnDataResponse>{
    const httpOptions = { headers: this.headers }
    return this.http.post<ReturnDataResponse>(traspasos.insert, traspaso, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  getTraspasos(filter: TraspasoGetRequest): Observable<GetTraspasoResponse> {
    const httpOptions = { headers: this.headers }
    const url = `${traspasos.get}?pAlmacenOrigen=${filter.pAlmacenOrigen}&pAlmacenDestino=${filter.pAlmacenDestino}&pFechaInicio=${filter.pFechaInicio}&pFechaFinal=${filter.pFechaFinal}`
    return this.http.get<GetTraspasoResponse>(url, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
