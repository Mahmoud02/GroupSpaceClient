import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {IPost} from '../models/IPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  endPoint = 'https://localhost:44306/api/posts';
  endPoint2 = 'https://localhost:44306/api/groups';
  endPoint3 = 'https://localhost:44306/api/postReports';
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  savePost(post: any): Observable<any> {
    const formData = new FormData();
    formData.append('Text', post.Text);
    formData.append('UserId', post.UserId);
    formData.append('GroupId', post.GroupId);
    formData.append('Photo', post.Photo);
    formData.append('NumOfLikes', post.NumOfLikes);

    return this.httpClient.post<any>(this.endPoint, formData);
  }
  deletePost(postId: any): Observable<any> {
    return this.httpClient.delete<any>(this.endPoint + '/' + postId , this.httpHeader);
  }
  getGroupPosts(groupId: any): Observable<any> {
    return this.httpClient.get<IPost[]>(this.endPoint2 + '/' + groupId + '/posts', this.httpHeader);
  }
  reportPost(reportObj: any): Observable<any> {
    return this.httpClient.post<any>(this.endPoint3, reportObj , this.httpHeader);
  }
}
