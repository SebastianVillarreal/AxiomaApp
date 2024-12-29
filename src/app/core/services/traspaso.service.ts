import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { traspasos } from '@Global/endpoints';
import { ReturnDataResponse } from '@Models/Response';
import { GetTraspasoResponse, TraspasoGetRequest, TraspasoInsertRequest, TraspasoUpdateRequest } from '@Models/Traspaso';
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

  deleteTraspaso(id: number): Observable<boolean>{
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(traspasos.delete, { id }, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  updateTraspaso(traspaso: TraspasoUpdateRequest): Observable<boolean>{
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(traspasos.update, traspaso, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
