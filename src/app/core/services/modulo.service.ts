import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { modulos } from '@Global/endpoints';
import { GetModuloResponseData, ModuloInsertRequest, ModuloUpdateRequest } from '@Models/Modulo';
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

  insertModulo(modulo: ModuloInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.post<boolean>(modulos.insert, modulo,httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
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

  updateModulo(modulo: ModuloUpdateRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(modulos.update, modulo, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
