import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthCredentialsInterface } from './interfaces/auth-credentials.interface';
import { AuthHandlerService } from './auth-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService {
  
  constructor(private httpClient: HttpClient) {}

  apiUrl = 'https://fetest.demo.axeos.cloud';

  private addAuthHeader(httpHeader: HttpHeaders) {
    if (this.isLoggedIn()) {
      httpHeader = httpHeader.set(
        'Authorization',
        localStorage.getItem('token_type') +
          ' ' +
          localStorage.getItem('access_token')
      );
    }
    return httpHeader;
  }
  private isLoggedIn() {
    if (localStorage.getItem('access_token')) return true;
    return false;
  }
  makeCall() {
    this.httpClient.post(this.apiUrl + '/apis/pbx/v1/calls',  {"number": "301"}, {headers: this.addAuthHeader(new HttpHeaders())}).subscribe((data)=>{console.log(data)})
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
      .get(this.apiUrl + '/apis/pbx/v1/calls', {
        headers: this.addAuthHeader(new HttpHeaders()),
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
