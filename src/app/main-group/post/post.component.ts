import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from '../../Services/group.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PostService} from '../../Services/post.service';
import {PostCommentService} from '../../Services/post-comment.service';

import {IPost} from '../../models/IPost';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  Posts: IPost[] = [];
  @Input() groupId = '';
  uploadedImageUrl: any;
  user: any;
  userId: any;
  constructor(
    private postService: PostService,
    private postCommentService: PostCommentService,
    private snackBar: MatSnackBar,
    private oauthService: OAuthService
  ) { }

  ngOnInit(): void {
    const claims: any = this.oauthService.getIdentityClaims();
    this.userId = claims.sub;
    this.callGetGroupPostsApi(this.groupId);
  }
  /*** Post services ***/
  publishPost(postDescription: any , postPhoto: any): void {
    const postImage = postPhoto.files[0] ? postPhoto.files[0] : null;
    const postObj = {
      Text: postDescription,
      GroupId: this.groupId,
      Photo: postImage,
      NumOfLikes: 0
    };
    this.callSaveGroupApi(postObj);
  }
  callSaveGroupApi(post: any): void{
    this.postService.savePost(post).subscribe(
      (data) => {
        this.openSnackBar(data.message , 'close', {duration: 2000});
        console.log(data);
      },
      (err) => {
        this.openSnackBar('Something wrong happen during communicate with Api!!', 'close',
          {
            duration: 2000,
            panelClass: ['invalidToast']}
        );
        console.log(err);
      }
    );
  }
  callGetGroupPostsApi(groupId: any): void{
    this.postService.getGroupPosts(groupId).subscribe(
      (result) => {
        console.log('the posts');
        console.log(result);
        this.Posts = result.data;
        console.log(this.Posts);
      },
      (err) => {
        this.openSnackBar('Something wrong happen during communicate with Api!!', 'close',
          {
            duration: 2000,
            panelClass: ['invalidToast']}
        );
        console.log(err);
      }
    );
  }

  setCommentsVisibilty(element: HTMLDivElement): void {
    if ( element.style.display === 'block'){
      element.style.display = 'none';
    }else{
      element.style.display = 'block';

    }
  }

  showImage(event: Event): void {
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.uploadedImageUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }
  setDropDownListVisibility(ele: any): void{
    if ( ele.style.display === 'inline-block'){
      ele.style.display = 'none';
    }else{
      ele.style.display = 'inline-block';
    }
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(
      (result) => {
        this.openSnackBar(result.message , 'close', {duration: 2000});
      },
      (err) => {
        this.openSnackBar('Something wrong happen during communicate with Api!!', 'close',
          {
            duration: 2000,
            panelClass: ['invalidToast']}
        );
        console.log(err);
      }
    );
  }
  reportPost(postId: number , userId: number): void {
    const reportObj = {
      UserId: userId,
      GroupId: this.groupId,
      PostId: postId,
    };
    this.postService.reportPost(reportObj).subscribe(
      (result) => {
        this.openSnackBar(result.message , 'close', {duration: 2000});
      },
      (err) => {
        this.openSnackBar('Something wrong happen during communicate with Api!!', 'close',
          {
            duration: 2000,
            panelClass: ['invalidToast']}
        );
        console.log(err);
      }
    );
  }
  /***Comments methods***/
  saveComment(value: string , postId: number): void {
    const commentObj = {
      Text: value,
      PostId: postId,
      NumOfLikes: 0
    };
    this.postCommentService.saveComment(commentObj).subscribe(
      (result) => {
        this.openSnackBar(result.message , 'close', {duration: 2000});
      },
      (err) => {
        this.openSnackBar('Something wrong happen during communicate with Api!!', 'close',
          {
            duration: 2000,
            panelClass: ['invalidToast']}
        );
        console.log(err);
      }
    );
  }
  deleteComment(postCommentId: number): void {
    this.postCommentService.deleteComment(postCommentId).subscribe(
      (result) => {
        this.openSnackBar(result.message , 'close', {duration: 2000});
      },
      (err) => {
        this.openSnackBar('Something wrong happen during communicate with Api!!', 'close',
          {
            duration: 2000,
            panelClass: ['invalidToast']}
        );
        console.log(err);
      }
    );
  }
  /*Reports*/
  /***Utils methods***/
  openSnackBar(message: string, action: string , config: any): void {
    this.snackBar.open(message, action, config);
  }



}
