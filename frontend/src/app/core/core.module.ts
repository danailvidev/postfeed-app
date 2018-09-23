import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Service
import { AuthService } from '../auth/auth.service';
import { ResponseInterceptor } from './response.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { SocketIOService, SocketService } from './web-sockets';

// Guards
import { AuthGuard } from '../auth/auth.guard';

// system
import { EnsureModuleLoadedOnceGuard } from '../shared/module-import-guard';

@NgModule({
    imports: [
        HttpClientModule,
        BrowserAnimationsModule
    ],
    declarations: [],
    providers: [
        AuthService,
        AuthGuard,
        { provide: SocketService, useClass: SocketIOService },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
    ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}
