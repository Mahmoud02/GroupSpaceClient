import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IGroup} from '../models/IGroup';
import {IGroupTypes} from '../models/IGroupTypes';

@Injectable({
  providedIn: 'root'
})
export class GroupTypesService {
  endPoint = 'https://localhost:44306/api/grouptypes';
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  getGroupTypes(): Observable<any> {
    return this.httpClient.get<IGroupTypes[]>(this.endPoint, this.httpHeader);
  }
}
