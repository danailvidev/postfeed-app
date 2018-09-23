import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../../../../shared/abstract/abstract.service';
import { CommentModel } from './comment.model';
import { Notificator } from '@app/shared/components/notificator';

@Injectable({
    providedIn: 'root'
})
export class CommentsService extends AbstractService<CommentModel> {
    serviceUrl = `post/:id/comment`;

    constructor(protected http: HttpClient) {
        super(http);
    }

    public saveComment(post, text): any {
        let comment = new CommentModel();
        comment.content = text;
        this.serviceUrl = `post/${post._id}/comment`;
        super.save(comment).subscribe( (res: any) => {
            Notificator.emit({ severity: 'success', summary: 'Success!', detail: 'Comment Added!' });
        });
    }
}
