import { AbstractModel } from '@app/shared/abstract/abstract.model';
import { Subscription, Observable } from 'rxjs';
import { ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Notificator } from '../components/notificator';

export abstract class AbstractEditComponent<T extends AbstractModel> implements OnInit, OnDestroy {
    protected subscriptions: { [key: string]: Subscription } = {};
    public abstract onAdd: EventEmitter<T>;

    public constructor(
        protected elRef: ElementRef,
        protected svc: AbstractService<T>) { }

    public ngOnInit(): void {
        this.subscriptions.modelAdded = this.onAdd.subscribe(() => {
            Notificator.emit({ severity: 'success', summary: 'Success!', detail: 'Added!' });
        });
    }

    public ngOnDestroy(): void {
        Object.keys(this.subscriptions).forEach(k => {
            this.subscriptions[k].unsubscribe();
        });
    }

    protected save(data: T): void {
        let observable: Observable<T> = this.svc.save(data);
        observable.subscribe((res: T) => {
            console.log(res);
            this.resetControls();
        }, (err) => {
            console.log(err);
        });
    }

    protected resetControls() {
        let inputs = this.elRef.nativeElement.querySelectorAll('.ng-dirty');
        if (inputs && inputs.length) {
            inputs.forEach((i: HTMLElement) => {
                i.classList.remove('ng-dirty');
                i.classList.add('ng-pristine');
            });
        }
    }
}