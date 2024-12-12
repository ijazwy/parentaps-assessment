import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { Locale } from '../enum/general.enum';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authService.currentUserValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.API_URL);
        const locale = localStorage.getItem('language') === Locale.Danish? Locale.Danish: Locale.English;
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            request = request.clone({headers: request.headers.set('Accept-Language', locale)});
        }
        return next.handle(request);
    }
}