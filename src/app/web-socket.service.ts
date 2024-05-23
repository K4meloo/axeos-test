//web-socket.service.ts

import { Injectable } from '@angular/core';
import { AuthHandlerService } from './auth-handler.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { env } from '../environment/env';

@Injectable({
  providedIn: 'root',
})
export class webSocketService {
  dataObserver: Observable<string>;
  url: string = env.apiWSUrl;
  socket!: WebSocketSubject<any>;

  constructor(private authHandler: AuthHandlerService) {
    this.dataObserver = new Observable((observer) => {
      this.socket = webSocket(this.url);
      this.socket.next({ access_token: authHandler.getToken() });
      this.socket.subscribe((msg) => {
        observer.next(msg);
      });
    });
  }

  getObserver() {
    return this.dataObserver;
  }
}
