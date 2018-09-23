import { AbstractModel } from '@app/shared/abstract/abstract.model';

export class UserModel extends AbstractModel {
    email: string;
    password: string;
    id: string;
}
