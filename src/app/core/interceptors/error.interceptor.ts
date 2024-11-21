import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs";
import { NbToastrService } from "@nebular/theme";
import { Router } from "@angular/router";

export class ErrorInterceptor implements HttpInterceptor{
  private router = inject(Router);
  private toastr = inject(NbToastrService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')!.toString();
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body.StatusCode === 200) {
            this.toastr.success(
              event.body.Message,
              'Solicitud Exitosa'
            )
          } else if (event.body.StatusCode === 201) {
            this.toastr.success(
              event.body.Message,
              'Solicitud Exitosa 201'
            )
          } else if (event.body.StatusCode === 409) {
            this.toastr.warning(
              event.body.Message,
              'Ha Ocurrido un Error'
            )
          }
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastr.danger('', 'Sesión Vencida')
          localStorage.clear();
          this.router.navigate(['auth/login']);
        } else if (err.status === 404) {
          this.toastr.danger('Servicio No Encontrado', 'Ha Ocurrido un Error')
        }
        return throwError(err);
      })
    )
  }
}
