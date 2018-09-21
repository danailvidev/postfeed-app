import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Notificator } from '../shared/components/notificator';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private router: Router, private url: LocationStrategy) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            tap(event => {
                // if (event.type === HttpEventType.Response ) {
                //     console.log(event.body);
                // }
            }, (err: any) => {
                if (err && !err.ok) {
                    if (err.status && err.statusText && err.url) {
                        Notificator.emit({ severity: 'error', summary: err.status + ' ' + err.statusText, detail: err.url});
                    } else {
                        Notificator.emit({ severity: 'error', summary: err, detail: err});
                    }
                }
            })
        );
    }
}
