import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post.model';
import { PostsService } from '../posts.service';
import { CommentsService } from '../comments/comment.service';

@Component({
    selector: 'pf-posts-list',
    templateUrl: 'posts-list.component.html',
    styleUrls: ['posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
    posts: Array<PostModel> = [];
    constructor(
        private svc: PostsService,
        private commentSvc: CommentsService) { }

    ngOnInit() {
        this.getPosts();
    }

    addComment(post, text) {
        this.commentSvc.saveComment(post, text);
    }

    private getPosts() {
        this.svc.fetchPagedList({}).subscribe(res => {
            this.posts = res;
        }, err => {
            console.log(err);
        });
    }
}