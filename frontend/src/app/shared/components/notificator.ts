import { EventEmitter } from '@angular/core';
import { Message } from 'primeng/primeng';

export let Notificator: EventEmitter<Message> = new EventEmitter();
