import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../../../shared/abstract/abstract.service';
import { PostModel } from './post.model';

@Injectable({
    providedIn: 'root'
})
export class PostsService extends AbstractService<PostModel> {
    serviceUrl = 'post';

    constructor(protected http: HttpClient) {
        super(http);
    }

    public saveComment(post, comment): any {
        const endpoint = `http://localhost:3000/api/post/${post._id}/comment`;
        this.http.post<any>(endpoint, comment, this.defaultOptions).subscribe((res: any) => {
            console.log(res);
        });
    }
}
