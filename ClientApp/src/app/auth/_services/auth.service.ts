import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { tap, share } from 'rxjs/operators';
import { TokenResponse } from '../_interfaces/token-response';
import { MatSnackBar } from '@angular/material';
import { TokenRequest } from '../_interfaces/token-request';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authKey = 'auth';
  authUser = 'user';
  clientId = 'Shine';
  redirectUrl: string;
  tokenObs: Observable<any>;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject(PLATFORM_ID) private platformId: any,
    private snackBar: MatSnackBar) { }

  login(username: string, password: string): Observable<TokenResponse> {
    const url = this.baseUrl + 'api/token/auth';
    const data = <TokenRequest>{
      username: username,
      password: password,
      clientId: this.clientId,
      // Required when signing up with username/password
      grantType: 'password',
    };

    return this.getServerAuth(url, data);
  }

  // Try to refresh token
  refreshToken(): Observable<boolean> {
    const url = this.baseUrl + 'api/token/auth';
    const data = <TokenRequest>{
      clientId: this.clientId,
      // Required when signing up with username/password
      grantType: 'refresh_token',
      refreshToken: this.getLocalAuth() !== undefined ? this.getLocalAuth().refreshToken : null,
    };
    return this.getServerAuth(url, data);
  }

  getServerAuth(url: string, data: TokenRequest): any {
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
    this.snackBar.open('Logging out, see you later!', 'Close');
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
        localStorage.clear();
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
