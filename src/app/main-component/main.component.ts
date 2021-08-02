import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }
// tslint:disable-next-line:variable-name
  _opened = true;
  mode = 'push' as const;
  _toggleOpened(): void {
    this._opened = !this._opened;
  }
  ngOnInit(): void {
  }

  signOutUser(): void {
    localStorage.removeItem('userData');
    // logged in so return true
    this.router.navigateByUrl('/login');
  }
}
