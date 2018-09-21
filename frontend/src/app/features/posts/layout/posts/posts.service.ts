import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient} from '@angular/common/http';
import { AbstractService } from '../../../../shared/abstract/abstract.service';
import { PostModel } from '@app/features/posts/layout/posts/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostsService extends AbstractService<PostModel> {
    baseUrl = environment.backend['baseUrl'];
    serviceUrl = 'post';

    constructor(protected http: HttpClient) {
        super(http);
     }
}
