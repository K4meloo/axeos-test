import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHandlerService } from '../auth-handler.service';
import { ApiHandlerService } from '../api-handler.service';
import { SwitchStatus } from '../interfaces/switch-status.interface';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-switches',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './switches.component.html',
  styleUrl: './switches.component.css',
})
export class SwitchesComponent {
  toggleSwitch(item: SwitchStatus) {
    this.apiHandler.toggleSwitch(item.uuid, !item.value).subscribe((data) => {
      item.value = data.value;
    });
  }
  switches: Array<SwitchStatus> = [];
  constructor(
    private router: Router,
    private authHandler: AuthHandlerService,
    private apiHandler: ApiHandlerService
  ) {}
  ngOnInit() {
    this.apiHandler.getSwitches().subscribe((data) => {
      this.switches = data;
    });
  }
  logout() {
    this.authHandler.logout();
  }
  backToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
}
