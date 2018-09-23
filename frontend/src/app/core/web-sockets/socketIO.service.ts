import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import * as socketIo from 'socket.io-client';
import { SocketService } from './socket-service';

const SOCKET_SERVER_URL = environment.SOCKET_SERVER_URL;

@Injectable()
export class SocketIOService extends SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SOCKET_SERVER_URL);
    }

    public send(message: any): void {
        this.socket.emit('new post', message);
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('post', (data: any) => {
                observer.next(data);
            });
        });
    }
}
