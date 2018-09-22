import { AbstractModel } from '@app/shared/abstract/abstract.model';

export class PostModel extends AbstractModel {
    content: string;
    createdBy: {
        id: string,
        email: string
    };
    createdAt: Date;
}
