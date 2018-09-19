import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router) { }

    canLoad(): Observable<boolean> {
        if (!this.authService.isAuthenticated) {
            this.router.navigate([`/login`]);
            return of(false);
        }
        return of(true);
    }
}
