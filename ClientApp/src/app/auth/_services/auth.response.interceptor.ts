import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {
    currentRequest: HttpRequest<any>;
    auth: AuthService;

    constructor(private injector: Injector,
        private router: Router,
        private route: ActivatedRoute) { }

    intercept(request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        // *Get AuthService DI
        this.auth = this.injector.get(AuthService);
        // Check if token already exist on localStorage
        const token = (this.auth.isLoggedIn()) ?
            (this.auth.getLocalAuth() !== undefined ? this.auth.getLocalAuth().token : null) : null;

        if (token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
            // Save current request
            this.currentRequest = request;

            return next.handle(request).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // Do nothing
                    }
                }, error => {
                    return this.handleError(error);
                }));
        } else {
            return next.handle(request);
        }
    }

    handleError(error: any) {
        if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
                // JWT token might be expired:
                //  try to get a new one using refresh token

                const previousRequest = this.currentRequest;

                this.auth.refreshToken().subscribe(res => {

                    if (res) {
                        // Re-submit the failed request
                        const http = this.injector.get(HttpClient);
                        // TODO: request but page not refresh
                        // const url = this.route['_routerState'].snapshot.url;
                        // this.router.navigate([url]);
                        this.router.navigate(['']);
                    } else {
                        // Erase current token
                        this.auth.logout();

                        // Redirect to login page
                        this.router.navigate(['login']);
                    }
                });
            }
        }
        return throwError(error);
    }
}
