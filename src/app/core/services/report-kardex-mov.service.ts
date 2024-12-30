import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reportKardexMov } from '@Global/endpoints';
import { GetReporteKardexMovResponse, ReportGetRequest } from '@Models/ReporteKardexMov';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportKardexMovService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }

  getReportKardexMov(filter: ReportGetRequest): Observable<GetReporteKardexMovResponse> {
    const httpOptions = { headers: this.headers }
    const url = `${reportKardexMov.get}?FechaInicio=${filter.FechaInicio}&FechaFinal=${filter.FechaFinal}`
    return this.http.get<GetReporteKardexMovResponse>(url, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  exportReportKardexMov(): Observable<Blob>{
    const httpOptions = { headers: this.headers, responseType: 'blob' as 'json' }
    return this.http.get<Blob>(reportKardexMov.export, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
