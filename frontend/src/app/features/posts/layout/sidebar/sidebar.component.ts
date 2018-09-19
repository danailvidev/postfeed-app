import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';

@Component({
    selector: 'pf-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    constructor(private auth: AuthService) { }

    ngOnInit() { }

    signOut() {
        this.auth.logout();
    }
}