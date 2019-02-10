import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenResponse } from '../_interfaces/token-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authKey: string = 'auth';
  clientId: string = "Shine";

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject(PLATFORM_ID) private platformId: any) { }

  login(username: string, password: string): Observable<TokenResponse> {
    var url = this.baseUrl + 'api/token/auth';
    var data = {
      username: username,
      password: password,
      clientId: this.clientId,
      // Required when signing up with username/password
      grantType: 'password',
      // Space-separated list of scopes for which the token is issued
      scope: 'offline_access profile email'
    };

    return this.getServerAuth(url, data);
  }

  getServerAuth(url: string, data: any): any {
    return this.http.post<TokenResponse>(url, data).pipe(
      tap((res: TokenResponse) => {
        const token = res && res.token;
        // If the token is there, login has been successful
        if (token) {
          // Store username and jwt token
          this.setLocalAuth(res);
          // Successful login
          return true;
        }
        // Failed login
        return throwError('Unauthorized');
      })
    );
  }

  logout(): boolean {
    this.setLocalAuth(null);
    return true;
  }

  // Persist auth into localStorate or removes it if a NULL argument is given
  setLocalAuth(auth: TokenResponse | null): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (auth) {
        localStorage.setItem(
          this.authKey,
          JSON.stringify(auth)
        );
      } else {
        localStorage.removeItem(this.authKey);
      }
    }
    return true;
  }

  // Retrieves the auth JSON object from localStorage (or NULL if none)
  getLocalAuth(): TokenResponse | null {
    if (isPlatformBrowser(this.platformId)) {
      const i = localStorage.getItem(this.authKey);
      if (i) {
        return JSON.parse(i);
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const localAuth = localStorage.getItem(this.authKey);
      if (localAuth) {
        return true;
      } else {
        return false;
      }
    }
  }
}
