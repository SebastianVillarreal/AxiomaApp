import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DetallesRecetaInsertRequest } from '@Models/DetalleRecetas';

import { detalleRecetas } from '@Global/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DetalleRecetasService {
  private headers: HttpHeaders

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({})
  }

  insertDetalleReceta(detalle: DetallesRecetaInsertRequest): Observable<Boolean> {
    const httpOptions = {headers: this.headers}
    return  this.http.post<Boolean>(detalleRecetas.insert, detalle, httpOptions)
    .pipe (
      map(res => {
        return res
      })
    )
  }
}
