import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Locale } from '../enum/general.enum';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _translate: TranslateService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const locale = localStorage.getItem('language') === Locale.Danish? Locale.Danish: Locale.English;
    request = request.clone({headers: request.headers.set('Accept-Language', locale)});
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMsg = '';
        let validationErrorsMsgs: any = [];
        if (err?.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${err?.error?.message}`;
        } 
        else {
          if(err?.status == 401){
            this._authService.logout();
          }
          else{
            console.log('This is server side error');
            errorMsg = `Error Code: ${err?.status},  Message: ${err?.message},  Message: ${err?.error?.error?.message}`;
            if (
              err.error.error.validationErrors &&
              err.error.error.validationErrors.length > 0
            ) {
              validationErrorsMsgs = err.error.error.validationErrors
                .map((e: any, i: any) => i + 1 + '-' + e.message )
                .join('<br>');
            }
            Swal.fire({
              toast: true,
              position: 'top-end',
              title: `${this._translate.instant('ERROR_MESSAGE_TITLE')}`,
              html: `${err.error.error.message}<br/> ${validationErrorsMsgs} `,
              showConfirmButton: false,
              icon: 'error',
              timer: 6000,
            });
          }
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
