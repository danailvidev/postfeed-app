import { AbstractModel } from '../shared/components/abstract.model';

export class UserModel extends AbstractModel {
    email: string;
    password: string;
    userId: string;
}
