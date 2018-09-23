import { AbstractModel } from '@app/shared/abstract/abstract.model';
import { CommentModel } from './comments/comment.model';

export class PostModel extends AbstractModel {
    content: string;
    createdBy: {
        userId: string,
        userEmail: string
    };
    createdAt: Date = new Date();
    hidden: Boolean;
    meta: {
        likes: Number,
        dislikes: Number
    };
    comments: Array<CommentModel>;
}
