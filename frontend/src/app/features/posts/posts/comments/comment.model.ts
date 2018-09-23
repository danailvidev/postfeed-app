import { AbstractModel } from '@app/shared/abstract/abstract.model';

export class CommentModel extends AbstractModel {
    content: string;
    createdBy: {
        id: string;
        email: string;
    };
    createdAt: Date = new Date();
}
