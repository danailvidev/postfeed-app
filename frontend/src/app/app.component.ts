import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/primeng';
import { Notificator } from './shared/components/notificator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    protected messages: Array<Message>;
    private subscriptions: Subscription;

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        this.subscriptions = Notificator.subscribe((msg: Message) => {
            if (!msg && !msg.detail) {
                return;
            }
            this.messageService.add({
                severity: msg.severity,
                detail: msg.detail,
                summary: msg.summary,
            });
        });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.messageService.clear();
    }
}
