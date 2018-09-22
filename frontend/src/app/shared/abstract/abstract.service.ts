import { AbstractModel } from './abstract.model';
import { HttpParams, HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment as env } from '@env/environment';
import { EventEmitter } from '@angular/core';
import { SearchParamsInterface } from '../interfaces/interfaces';

export abstract class AbstractService<T extends AbstractModel> {

    public readonly modelAdded: EventEmitter<T> = new EventEmitter();
    public readonly modelEdited: EventEmitter<T> = new EventEmitter();
    public readonly modelSaved: EventEmitter<T> = new EventEmitter();
    public readonly modelDeleted: EventEmitter<T> = new EventEmitter();

    protected abstract readonly serviceUrl: string;
    protected baseUrl = env.backend['baseUrl'];

    protected defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    protected defaultOptions = new HttpResponse({ headers: this.defaultHeaders });

    protected readonly defaultAcOrder: string = 'name';

    public constructor(protected http: HttpClient) {
    }

    public fetch(id: any): Observable<T> {
        return Observable.create((observer: Observer<T>) => {
            this.http.get(this.getEndpoint() + id).subscribe((response: any) => {
                observer.next(response);
            });
        });
    }

    public delete(model: T): Observable<HttpResponse<T>> {
        return Observable.create((observer: Observer<HttpResponse<T>>) => {
            if (model.id) {
                this.http.delete<T>(this.getEndpoint() + '/' + model.id, { observe: 'response' }).subscribe((result: HttpResponse<T>) => {
                    if (!result.ok) {
                        throw new Error('something went wrong');
                    }
                    observer.next(result);
                });
            } else {
                throw new Error('Id not provided!');
            }
        });
    }

    public save(model: T): Observable<T> {
        return Observable.create((observer: Observer<T>) => {
            const body = JSON.stringify(model);
            if (model.id) {
                // edit
                this.http.put<T>(this.getEndpoint(), body, this.defaultOptions).subscribe((result: T) => {
                    this.modelEdited.emit(model);
                    this.modelSaved.emit(model);
                    observer.next(model);
                });
            } else {
                // add
                this.http.post<T>(this.getEndpoint(), body, this.defaultOptions).subscribe((result: T) => {
                    this.modelAdded.emit(model);
                    this.modelSaved.emit(model);
                    observer.next(model);
                });
            }
        });
    }

    public fetchPagedList(params: SearchParamsInterface = {}): Observable<any> {
        if (!params.page) {
            params.page = 0;
        }
        if (!params.size) {
            params.size = env.defaultPagination.defaultResultsPerPage;
        }
        return this._fetchPagedList(this.getEndpoint(), params);
    }

    protected _fetchPagedList(endpoint: string, searchParams: SearchParamsInterface = {}): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this.http.get(endpoint, { params: this.prepareParams(searchParams) }).subscribe((response: any) => {
                observer.next(response);
            });
        });
    }
    public fetchACList(params: any): Observable<Array<T>> {
        return Observable.create((observer: Observer<Array<T>>) => {
            params = params || {};
            params.size = env.maxAutocompleteItems;
            params.order = this.defaultAcOrder;
            this.fetchPagedList(params).subscribe((result: any) => {
                observer.next(result);
            });
        });
    }

    public fetchDropDownList(params?: any): Observable<Array<T>> {
        return Observable.create((observer: Observer<Array<T>>) => {
            params = params || {};
            params.size = env.maxDropdownItems;
            params.order = this.defaultAcOrder;
            this.fetchPagedList(params).subscribe((result: any) => {
                observer.next(result);
            });
        });
    }

    protected prepareParams(input: SearchParamsInterface = {}): HttpParams {
        let output: HttpParams = new HttpParams();
        if (input.size && input.size === Infinity) {
            delete input.size;
        }
        Object.keys(input).forEach(key => {
            output = output.set(key, (<any>input)[key]);
        });
        return output;
    }

    public getEndpoint(): string {
        return this.baseUrl + this.serviceUrl;
    }
}
