import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from '../../Services/group.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PostService} from '../../Services/post.service';
import {IPost} from '../../models/IPost';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  Posts: IPost[] = [];
  @Input() groupId = '';
  uploadedImageUrl: any;
  constructor(private postService: PostService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.callGetGroupPostsApi(this.groupId);
  }

  publishPost(postDescription: any , postPhoto: any): void {
    const postImage = postPhoto.files[0] ? postPhoto.files[0] : null;
    const postObj = {
      Text: postDescription,
      UserId: 4,
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
  openSnackBar(message: string, action: string , config: any): void {
    this.snackBar.open(message, action, config);
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
}
