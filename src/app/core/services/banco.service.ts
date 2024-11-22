import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { bancos } from '@EndPoints';
import { GetBancosResponse,BancoInsertRequest, BancoUpdateRequest } from '@Models/Banco';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }

  InsertBanco(banco:BancoInsertRequest): Observable<boolean>
  {
    const httpOptions = {headers: this.headers}
    return this.http.post<boolean>(bancos.insert, banco, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  GetAllBancos(): Observable<GetBancosResponse>{
    const httpOptions = {headers: this.headers}
    return this.http.get<GetBancosResponse>(bancos.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  UpdateBanco(banco: BancoUpdateRequest): Observable<boolean>{
    const httpOptions = {headers: this.headers}
    return this.http.put<boolean>(bancos.update, banco, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  DeleteBanco(id: number): Observable<Boolean>{
    const httpOptions = {headers: this.headers}
    return this.http.put<Boolean>(bancos.delete,{id}, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
