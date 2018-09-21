import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { UserModel } from '@app/auth/user.model';
import { PostsService } from './posts.service';
import { PostModel } from './post.model';
import { AbstractEditComponent } from '../../../../shared/abstract/abstract-edit.component';

@Component({
    selector: 'pf-post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['post-create.component.scss']
})

export class PostCreateComponent extends AbstractEditComponent<PostModel> implements OnInit {
    @Output()
    public get onAdd(): EventEmitter<PostModel> {
        return this.svc.modelAdded;
    }

    user: UserModel;

    constructor(
        elRef: ElementRef,
        private auth: AuthService,
        svc: PostsService) {
            super(elRef, svc);
         }

    ngOnInit() {
        super.ngOnInit();
        this.auth.userInfo().subscribe(data => {
            this.user = data;
        });
    }
}