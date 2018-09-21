import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authService = this.injector.get(AuthService);
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'token ' + authService.token)
        });

        return next.handle(authRequest);
    }
}
