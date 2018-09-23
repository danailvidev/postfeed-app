import { AbstractModel } from '@app/shared/abstract/abstract.model';

export class CommentModel extends AbstractModel {
    content: string;
    createdBy: {
        userId: string;
        userEmail: string;
    };
    createdAt: Date = new Date();
}
