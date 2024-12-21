import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { personas } from '@Global/endpoints';
import { GetPersonaRespone, PersonaInsertRequest, PersonaUpdateRequest } from '@Models/Persona';
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

  insertPersona(persona: PersonaInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers }
    return this.http.post<boolean>(personas.insert, persona, httpOptions)
      .pipe(
        map(res => {
          return res
        }
      )
    )
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

  updatePersona(persona: PersonaUpdateRequest): Observable<boolean>{
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(personas.update, persona, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }

  deletePersona(id: number): Observable<boolean>{
    const httpOptions = { headers: this.headers }
    return this.http.put<boolean>(personas.delete, { id }, httpOptions)
      .pipe(
        map(res => {
        return res
      })
    )
  }
}
