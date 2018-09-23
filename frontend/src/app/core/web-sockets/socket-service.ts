export abstract class SocketService {
    abstract initSocket();
    abstract onMessage();
    abstract send(message: any): void;
}
