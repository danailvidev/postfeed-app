import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PostCreateComponent } from './layout/posts/post-create.component';
import { PostsListComponent } from './layout/posts/posts-list.component';

const routes: Routes = [
    {path: '', component: LayoutComponent}
];

export const PostsRouting: ModuleWithProviders = RouterModule.forChild(routes);

export class PostsComponents {
    public static components = [
        LayoutComponent,
        SidebarComponent,
        PostCreateComponent,
        PostsListComponent
    ];
}
