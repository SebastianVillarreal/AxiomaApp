import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { modulos } from '@Global/endpoints';
import { GetModuloResponseData } from '@Models/Modulo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }

  getModulos(): Observable<GetModuloResponseData> {
    const httpOptions = { headers: this.headers }
    return this.http.get<GetModuloResponseData>(modulos.get, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
