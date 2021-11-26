import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from '../auth.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSpinner = false;

  constructor(private oauthService: OAuthService, private snackBar: MatSnackBar, private router: Router) {
    if (this.oauthService.hasValidAccessToken()) {
      //  logged in so redirect to login page with the return url
      this.router.navigateByUrl('/feeds').then(
        value => {
          this.openSnackBar('Hello bro !! ', 'close',
            {
              duration: 3000,
            }
          );
        }
      );
    }
    this.configureIdentityProviderSettings();
  }
  ngOnInit(): void {}
  configureIdentityProviderSettings(): void{
    this.oauthService.configure(authCodeFlowConfig);
    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  authenticate(email: string, password: string): void{
    this.oauthService.initCodeFlow();
  }
  openSnackBar(message: string, action: string , config: any): void {
    this.snackBar.open(message, action, config);
  }
}
// old sign in
/*
 authenticate(email: string, password: string): void{
    this.showSpinner = true;
    const userAuth = {
      Email: email,
      Password: password
    };
    this.authService.authenticate(userAuth).subscribe(
      (result) => {
        this.showSpinner = false;
        const jsonData = JSON.stringify(result);
        localStorage.setItem('userData', jsonData);
        this.openSnackBar('Successfully login!!', 'close',
          {
            duration: 2000
          }
        );
        console.log(result);
        console.log(  localStorage.getItem('userData'));
        const user  = JSON.parse( localStorage.getItem('userData') as string);
        console.log( user.email);
        console.log( user.userId);

      },
      (err) => {
        this.showSpinner = false;
        if (err.error?.message){
          this.openSnackBar(err.error?.message, 'close',
            {
              duration: 2000,
              panelClass: ['invalidToast']
            });
        }else{
          this.openSnackBar('Something wrong happen during communicate with Api!!', 'close',
            {
              duration: 2000,
              panelClass: ['invalidToast']
            }
          );
        }
        console.log(err);
      }
    );
  }
*/
