import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { articulos } from '@EndPoints';
import { ArticuloInsertRequest, ArticuloUpdateRequest, GetArticulosResponse  } from '@Models/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }

  InsertArticulo(articulo: ArticuloInsertRequest): Observable<boolean>
  {
    const httpOptions = { headers: this.headers }
    return this.http.post<boolean>(articulos.insert, articulo, httpOptions)
      .pipe(
        map(res => {
          return res;
      })
    )
  }

  GetAllArticulos(): Observable<GetArticulosResponse>{
    const httpOptions = { headers: this.headers }
    return this.http.get<GetArticulosResponse>(articulos.get, httpOptions)
      .pipe(
        map(res => {
        return res;
      })
    )
  }
  
  UpdateArticulo(articulo: ArticuloUpdateRequest): Observable<boolean>{
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(articulos.update, articulo, httpOptions)
      .pipe(
        map(res => {
        return res;
      })
    )
  }

  DeleteArticulo(id: number): Observable<Boolean>{
    const httpOptions = { headers: this.headers }
    return this.http.put<Boolean>(articulos.delete, id, httpOptions)
      .pipe(
        map(res => {
          return res;
      })
    )
  }
}
