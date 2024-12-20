import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { personas } from '@Global/endpoints';
import { GetPersonaRespone } from '@Models/Persona';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }
  
  getPersonas(): Observable<GetPersonaRespone>{
    const httpOptions = { headers: this.headers }
    return this.http.get<GetPersonaRespone>(personas.get, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
