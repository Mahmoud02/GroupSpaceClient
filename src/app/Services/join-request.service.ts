import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IGroupTypes} from '../models/IGroupTypes';
import {IGroup} from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class JoinRequestService {

  endPoint = 'https://localhost:44306/api/joinrequests';
  endPoint2 = 'https://localhost:44306/api/users';

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  sendJoinRequest(joinRequest: any): Observable<any> {
    return this.httpClient.post<any>(this.endPoint, joinRequest, this.httpHeader);
  }
  deleteJoinRequest(joinRequest: any): Observable<any> {
    console.log('before the end');
    console.log(joinRequest);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        groupId: joinRequest.groupId
      },
    };
    console.log(options);
    return this.httpClient.delete<any>(this.endPoint, options );
  }
  refuseJoinRequest(joinRequestId: any): Observable<any> {
    return this.httpClient.delete<any>(this.endPoint + '/' + joinRequestId );
  }
  getGroupsIdOfJoinRequestByUserId(userId: any): Observable<any> {
    return this.httpClient.get(this.endPoint2 + '/' + userId + '/requests', this.httpHeader);
  }
  acceptJoinRequest(joinRequestId: any): Observable<any> {
    return this.httpClient.post(this.endPoint + '/' + joinRequestId + '/accept', this.httpHeader);
  }

}
