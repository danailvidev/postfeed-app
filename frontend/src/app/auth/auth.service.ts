import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseAuthUrl = environment.backend['baseUrl'] + 'auth/';
    TOKEN_KEY = 'token';
    DATA_KEY = 'userInfo';
    userData: any;

    constructor(
        private http: HttpClient) { }

    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    userInfo(): any {
        if (!this.userData) {
            this.userData = JSON.parse(localStorage.getItem(this.DATA_KEY));
        }
        return of(this.userData);
    }

    loginUser(userData): Observable<any> {
        this.userData = null;
        const body = userData;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = new HttpResponse({ headers: headers });
        return this.http.post<any>(this.baseAuthUrl + 'login', userData).pipe(map(res => {
            this.userData = res.userData;
            this.saveUserData(res.userData);
            this.saveToken(res.token);
            return true;
        }, (err) => {
            return false;
        }));
    }

    logout(): boolean {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.DATA_KEY);
            if (this.userData) {
                this.userData = null;
            }
            return true;
        } catch (err) {
            console.error('server error:', err);
            return false;
        }
    }

    registerUser(userData): Observable<any> {
        this.userData = null;
        const body = userData;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = new HttpResponse({ headers: headers });
        return this.http.post<any>(this.baseAuthUrl + 'register', body, options).pipe(map(res => {
            this.saveToken(res.token);
            this.saveUserData(res.userData);
            return true;
        }, (err) => {
            return err;
        }));
    }

    private saveToken(token) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    private saveUserData(data) {
        localStorage.setItem(this.DATA_KEY, JSON.stringify(data));
    }

    private handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof HttpResponse) {
            let errMessage = '';
            try {
                errMessage = error.statusText;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'json server error');
    }

}
