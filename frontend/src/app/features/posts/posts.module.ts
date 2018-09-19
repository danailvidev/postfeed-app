import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

// routing, components
import { PostsRouting, PostsComponents } from './posts.routing';

@NgModule({
  imports: [
    SharedModule,
    PostsRouting
  ],
  declarations: [PostsComponents.components]
})
export class PostsModule { }
