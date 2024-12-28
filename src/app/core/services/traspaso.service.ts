import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { traspasos } from '@Global/endpoints';
import { ReturnDataResponse } from '@Models/Response';
import { TraspasoInsertRequest } from '@Models/Traspaso';
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
}
