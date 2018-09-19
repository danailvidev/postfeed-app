import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Service
import { AuthService } from '../auth/auth.service';

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
        AuthGuard
    ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}
