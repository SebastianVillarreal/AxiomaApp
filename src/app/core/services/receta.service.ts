import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { recetas } from '@Global/endpoints';

import { GetRecetaResponse, RecetaModel } from '@Models/Receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }

  getRecetas(): Observable<RecetaModel[]>{
    const httpOptions = {headers: this.headers}
    return this.http.get<RecetaModel[]>(recetas.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
