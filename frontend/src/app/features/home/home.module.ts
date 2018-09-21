import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

// routing, components
import { HomeRouting, HomeComponents } from './home.routing';

@NgModule({
  imports: [
    SharedModule,
    HomeRouting
  ],
  declarations: [HomeComponents.components]
})
export class HomeModule { }
