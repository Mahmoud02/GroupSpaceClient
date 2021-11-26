import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IGroup} from '../models/IGroup';
import {IJoinRequest} from '../models/IJoinRequest';
import {IGroupMember} from '../models/IGroupMember';
import {IPostReport} from '../models/IPostReport';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  endPoint = 'https://localhost:44306/api/groups';
  endPoint2 = 'https://localhost:44306/api/users';
  endPoint3 = 'https://localhost:44306/api/members';

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  saveGroup(group: any): Observable<any> {
    const formData = new FormData();
    formData.append('Name', group.Name);
    formData.append('Description', group.Description);
    formData.append('CoverPhoto', group.CoverPhoto);
    formData.append('Private', group.Private);
    formData.append('GroupTypeId', group.GroupTypeId);
    return this.httpClient.post<any>(this.endPoint, formData);
  }
  getUserGroups(userId: any): Observable<any> {
    return this.httpClient.get<IGroup>(this.endPoint2 + '/' + userId + '/groups', this.httpHeader);
  }
  getUserJoinedGroups(userId: any): Observable<any> {
    return this.httpClient.get<IGroup[]>(this.endPoint2 + '/' + userId + '/joined', this.httpHeader);
  }
  findGroups(): Observable<any> {
    // const params = new HttpParams().set('sub', userId);
    // return this.httpClient.get<any>(this.endPoint + '/find', { params });
    return this.httpClient.get<any>(this.endPoint + '/find');
  }
  /*group related data*/
  getGroupMetaData(groupId: any): Observable<any> {
    return this.httpClient.get<IGroup>(this.endPoint + '/' + groupId + '/meta', this.httpHeader);
  }

  getGroupMembers(groupId: any): Observable<any> {
    return this.httpClient.get<IGroupMember[]>(this.endPoint + '/' + groupId + '/members', this.httpHeader);
  }
  getGroupJoinRequests(groupId: any): Observable<any> {
    return this.httpClient.get<IJoinRequest[]>(this.endPoint + '/' + groupId + '/requests', this.httpHeader);
  }
  getGroupReportedPosts(groupId: any): Observable<any> {
    return this.httpClient.get<IPostReport[]>(this.endPoint + '/' + groupId + '/reports', this.httpHeader);
  }
  /*Admin of the Action Services*/
  kickUserFromGroup(groupMemberId: any): Observable<any> {
    return this.httpClient.delete<any>(this.endPoint3 + '/' + groupMemberId );
  }
}
