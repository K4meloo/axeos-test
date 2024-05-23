import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthCredentialsInterface } from './interfaces/auth-credentials.interface';
import { AuthHandlerService } from './auth-handler.service';
import { SwitchStatus } from './interfaces/switch-status.interface';
import { env } from '../environment/env';
import { UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = env.apiUrl;

  toggleSwitch(uuid: string, value: boolean) {
    return this.httpClient.post<SwitchStatus>(
      this.apiUrl + '/apis/pbx/v1/switches/' + uuid,
      {
        value: value,
      }
    );
  }

  private isLoggedIn() {
    if (localStorage.getItem('access_token')) return true;
    return false;
  }

  public getSwitches() {
    return this.httpClient.get<Array<SwitchStatus>>(
      this.apiUrl + '/apis/pbx/v1/switches'
    );
  }

  makeCall() {
    this.httpClient
      .post(this.apiUrl + '/apis/pbx/v1/calls', { number: '301' })
      .subscribe((data) => {
        console.log(data);
      });
  }

  refreshToken(refresh_token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refresh_token);
    return this.httpClient.post<AuthCredentialsInterface>(
      this.apiUrl + '/apis/oauth2/token',
      body,
      {
        headers: headers,
        responseType: 'json',
      }
    );
  }

  authorize(
    username: string,
    password: string
  ): Observable<AuthCredentialsInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);

    return this.httpClient.post<AuthCredentialsInterface>(
      this.apiUrl + '/apis/oauth2/token',
      body,
      {
        headers: headers,
        responseType: 'json',
      }
    );
  }

  getCalls() {
    this.httpClient
      .get(this.apiUrl + '/apis/pbx/v1/calls')
      .subscribe((data) => {
        console.log(data);
      });
  }
}
