import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { articulos } from '@EndPoints';
import { GetArticulosResponse  } from '@Models/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
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
  

}
