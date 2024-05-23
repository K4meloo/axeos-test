import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthHandlerService {
  constructor(private apiHandler: ApiHandlerService, private router: Router) {}

  public login(username: string, password: string) {
    this.apiHandler
      .authorize(username, password)
      .subscribe((authCredentials) => {
        if (authCredentials.access_token) {
          localStorage.setItem('access_token', authCredentials.access_token);
          localStorage.setItem('refresh_token', authCredentials.refresh_token);
          localStorage.setItem('token_type', authCredentials.token_type);

          this.router.navigate(['/dashboard']);
        }
      });
  }
  public isLoggedIn(): boolean {
    let token = localStorage.getItem('access_token');
    return token != null && token.length > 0;
  }

  public getToken(): string {
    return this.isLoggedIn() ? localStorage.getItem('access_token')! : '';
  }
  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
    this.router.navigateByUrl('/');
  }
}
