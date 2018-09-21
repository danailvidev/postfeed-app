import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

// routing, components
import { AboutRouting, AboutComponents } from './about.routing';

@NgModule({
  imports: [
    SharedModule,
    AboutRouting
  ],
  declarations: [AboutComponents.components]
})
export class AboutModule { }
