import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { UserModel } from '@app/auth/user.model';

@Component({
    selector: 'pf-post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['post-create.component.scss']
})

export class PostCreateComponent implements OnInit {
    user: UserModel;

    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.auth.userInfo().subscribe(data => {
            this.user = data;
        });
    }
}