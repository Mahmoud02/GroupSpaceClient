import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private oauthService: OAuthService) {
  }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.startsWith('https://localhost:44306/api/')) {
      const accessToken = this.oauthService.getAccessToken();
      const headers = httpRequest.headers.set('Authorization', 'Bearer ' + accessToken);
      const authReq = httpRequest.clone({headers});
      console.log('token get addedddddddddddd');
      console.log(accessToken);
      return next.handle(authReq);
    }
    else{
      console.log('token notttttt added');
      return next.handle(httpRequest);}
  }
}
