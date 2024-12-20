import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catModulos } from '@Global/endpoints';
import { CatModuloInsertRequest, GetCatModuloResponse } from '@Models/CatModulo';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatModuloService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({})
  }

  insertCategoria(categoria: CatModuloInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.post<boolean>(catModulos.insert, categoria, httpOptions) 
      .pipe(
        map(res => {
        return res
      })
    )
  }

  getCategorias(): Observable<GetCatModuloResponse> {
    const httpOptions = { headers: this.headers }
    return this.http.get<GetCatModuloResponse>(catModulos.get, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
