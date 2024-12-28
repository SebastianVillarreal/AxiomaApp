import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detalleTraspasos } from '@Global/endpoints';
import { GetDetalleTraspasoResponse } from '@Models/DetalleTraspaso';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleTraspasoService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  getDetallesTraspaso(idTraspaso: number): Observable<GetDetalleTraspasoResponse>{
    const httpOptions = { headers: this.headers }
    const url = `${detalleTraspasos.get}?idTraspaso=${idTraspaso}`
    return this.http.get<GetDetalleTraspasoResponse>(url, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
