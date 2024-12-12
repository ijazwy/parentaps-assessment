import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_ACCOUNT_URL = `${environment.API_URL}`;

export interface User {
  token: string;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: any;
  afAuth: any;
  afs: any;
  public showLoader: boolean = false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // ---------------------------------------------------------------------------------------------------------------
  constructor(
    private router: Router,
    private http: HttpClient,
    public ngZone: NgZone
  ) {
    this.currentUserSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('parent__aps__user')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  // ---------------------------------------------------------------------------------------------------------------
  public setCurrentUserValue(data: any) {
    this.currentUserSubject.next(data);
  }
  // ---------------------------------------------------------------------------------------------------------------
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
  //----------------------------------------------------------------------------------------------------------------------
  login(email: string, password: string) {
    return this.http
      .post<User>(`${API_ACCOUNT_URL}/login`, {
        email,
        password
      })
      .pipe(
        map((res: any) => {
          localStorage.setItem(
            'parent__aps__user',
            JSON.stringify(res)
          );
          this.setCurrentUserValue(res);
          return res;
        })
      );
  }
  // ---------------------------------------------------------------------------------------------------------------
  logout() {
    localStorage.removeItem('parent__aps__user');
    //-------------------------------------------------------
    this.setCurrentUserValue(null);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }
  //----------------------------------------------------------------------------------------------------------------------
}
