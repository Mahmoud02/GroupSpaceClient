import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from '../authentication/auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private oauthService: OAuthService, private router: Router , private snackBar: MatSnackBar) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('hasValidAccessToken' , this.oauthService.hasValidAccessToken());
    console.log('Finnnnnnnnnnnn' , this.oauthService.hasValidIdToken() &&
      this.oauthService.hasValidIdToken());

    if (this.oauthService.hasValidAccessToken()) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl('/login').then(
      value => {
        this.openSnackBar('You need to Login in ', 'close',
        {
          duration: 3000,
          panelClass: ['invalidToast']
        }
        );
      }
    );
    return false;
  }
  openSnackBar(message: string, action: string , config: any): void {
    this.snackBar.open(message, action, config);
  }
}
/*
 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('userData')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl('/login').then(
      value => {
        this.openSnackBar('You need to Login in ', 'close',
        {
          duration: 3000,
          panelClass: ['invalidToast']
        }
        );
      }
    );
    return false;
  }
*/
