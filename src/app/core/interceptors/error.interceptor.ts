import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private toastr = inject(NbToastrService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('token')){
      const token: string = localStorage.getItem('token')!.toString();
      request = request;
      if (token) {
        request = request.clone({
          setHeaders: {
            authorization: `Bearer ${ token }`
          }
        });
      }
    }
    
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse && event.body.StatusCode === 201){
          this.toastr.success(event.body.message, 'Solicitud Exitosa');
        }else if(event instanceof HttpResponse && event.body.StatusCode === 409){
          this.toastr.warning(event.body.message, 'Ha Ocurrido un Error');
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastr.warning('', 'Sesión Vencida');
          localStorage.clear();
          this.router.navigate(['/login']);
        } else if(err.status === 404){
          this.toastr.warning('Servicio No Encontrado', 'Ha Ocurrido un Error');
        }
        return throwError( err );
      })
    );
  }
}
