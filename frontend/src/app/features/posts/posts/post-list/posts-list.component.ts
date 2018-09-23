import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post.model';
import { PostsService } from '../posts.service';
import { CommentsService } from '../comments/comment.service';
import { SocketService } from '../../../../core/web-sockets/socket-service';
import { UserModel } from '../../../../auth/user.model';
import { AuthService } from '../../../../auth/auth.service';
import { Notificator } from '@app/shared/components/notificator';

@Component({
    selector: 'pf-posts-list',
    templateUrl: 'posts-list.component.html',
    styleUrls: ['posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
    posts: Array<PostModel> = [];
    ioConnection: any;
    user: UserModel;

    constructor(
        private svc: PostsService,
        private commentSvc: CommentsService,
        private socketService: SocketService,
        private auth: AuthService) { }

    ngOnInit() {
        this.getCurrentUser();
        this.initIoConnection();
        this.getPosts();
    }

    addComment(post, text) {
        this.commentSvc.saveComment(post, text);
    }

    sendPost(post: any): void {
        if (!post) {
            return;
        }

        this.socketService.send(post);

        this.posts.unshift(post);
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe((post: any) => {
                if (post) {
                    this.posts.unshift(post);
                }
            });
    }

    private getPosts() {
        this.svc.fetchPagedList({}).subscribe(res => {
            this.posts = res;
        }, err => {
            console.log(err);
        });
    }

    private getCurrentUser(): any {
        this.auth.userInfo().subscribe(data => {
            this.user = data;
        });
    }
}