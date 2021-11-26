import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {
  endPoint = 'https://localhost:44306/api/postComments';
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  saveComment(comment: any): Observable<any> {
    return this.httpClient.post<any>(this.endPoint, comment, this.httpHeader);
  }
  deleteComment(commentId: any): Observable<any> {
    return this.httpClient.delete<any>(this.endPoint + '/' + commentId , this.httpHeader);
  }
}
