import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endPoint = 'https://localhost:44306/api/users/authenticate';
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  authenticate(user: any): Observable<any> {
    return this.httpClient.post<any>(this.endPoint, user, this.httpHeader);
  }
}
