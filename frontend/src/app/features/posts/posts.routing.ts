import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PostCreateComponent } from './layout/posts/post-create.component';
import { PostsListComponent } from './layout/posts/posts-list.component';
import { AuthGuard } from '@app/auth/auth.guard';
import { PostsWrapperComponent } from './layout/posts/post-wrapper.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', component: LayoutComponent, children: [
                { path: '',   redirectTo: 'posts', pathMatch: 'full' },
                { path: 'posts', component: PostsWrapperComponent },
                { path: 'about', canLoad: [AuthGuard], loadChildren: 'app/features/about/about.module#AboutModule' },
                { path: 'home', canLoad: [AuthGuard], loadChildren: 'app/features/home/home.module#HomeModule' },
            ]},
        ]
    }
];

export const PostsRouting: ModuleWithProviders = RouterModule.forChild(routes);

export class PostsComponents {
    public static components = [
        LayoutComponent,
        SidebarComponent,
        PostCreateComponent,
        PostsListComponent,
        PostsWrapperComponent
    ];
}
