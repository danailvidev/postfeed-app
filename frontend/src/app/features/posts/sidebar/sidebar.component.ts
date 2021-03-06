import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { UserModel } from '@app/auth/user.model';

@Component({
    selector: 'pf-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    user: UserModel;

    menuItems = [
        { link: 'home', label: 'home', icon: 'fas fa-home' },
        { link: 'posts', label: 'news-feed', icon: 'fas fa-newspaper' },
        { link: 'about', label: 'about', icon: 'fas fa-question' }
    ];


    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.auth.userInfo().subscribe( data => {
            this.user = data;
        });
     }

    signOut() {
        this.auth.logout();
    }
}