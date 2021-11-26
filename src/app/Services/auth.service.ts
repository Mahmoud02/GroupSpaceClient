import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthWellKnownEndpoints, OpenIdConfiguration} from 'angular-auth-oidc-client';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'https://localhost:5001/';
  originUrl = 'https://localhost:44306/';



  /*
  authenticate(user: any): Observable<any> {
    return this.httpClient.post<any>(this.endPoint, user, this.httpHeader);
  }*/

}
