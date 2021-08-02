import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData')) {
      // logged in so return true
      this.router.navigateByUrl('/login');
    }
  }
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
  openSnackBar(message: string, action: string , config: any): void {
    this.snackBar.open(message, action, config);
  }
}
