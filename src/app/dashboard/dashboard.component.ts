import { Component } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { webSocketService } from '../web-socket.service';
import { AuthHandlerService } from '../auth-handler.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  data: Array<string> = [];
  logout() {
    this.authHandler.logout();
  }
  checkCalls() {
    this.apiHandler.getCalls();
  }
  constructor(
    private apiHandler: ApiHandlerService,
    private webSocket: webSocketService,
    private authHandler: AuthHandlerService
  ) {
    this.webSocket.getObserver().subscribe((next) => {
      this.data.push(JSON.stringify(next));
    });
  }
  sendPing() {
    this.apiHandler.makeCall();
  }
}
