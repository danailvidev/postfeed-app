import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post.model';
import { PostsService } from '../posts.service';

export class CommentModel {
    content: string;
    createdBy: {
        userId: string;
        userEmail: string;
    };
    createdAt: Date;
}

@Component({
    selector: 'pf-posts-list',
    templateUrl: 'posts-list.component.html',
    styleUrls: ['posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
    posts: Array<PostModel> = [];
    constructor(
        private svc: PostsService) { }

    ngOnInit() {
        this.svc.fetchPagedList({}).subscribe(res => {
            this.posts = res;
        }, err => {
            console.log(err);
        });
    }

    addComment(post, text) {
        let comment = new CommentModel();
        comment.content = text;
        console.log(post, comment);
        this.svc.saveComment(post, comment);
    }
}