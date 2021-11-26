import { Component, OnInit } from '@angular/core';
import {GroupService} from '../../../../Services/group.service';
import {JoinRequestService} from '../../../../Services/join-request.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {IGroupMember} from '../../../../models/IGroupMember';
import {IPostReport} from '../../../../models/IPostReport';

@Component({
  selector: 'app-group-reports',
  templateUrl: './group-reports.component.html',
  styleUrls: ['./group-reports.component.css']
})
export class GroupReportsComponent implements OnInit {
  PostsReportList: IPostReport[] = [];
  FilteredPostsReportList: IPostReport[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.PostsReportList.length;
  GROUP_ID: any;

  constructor(
    private groupService: GroupService ,
    private snackBar: MatSnackBar,
    private router: Router)
  {
    // @ts-ignore
    const routerData = router.getCurrentNavigation().extras.state;
    // @ts-ignore
    this.GROUP_ID = routerData.state;
  }

  ngOnInit(): void {
    this.getGroupReportedPosts(this.GROUP_ID);
  }
  getGroupReportedPosts(groupId: any): void{
    this.groupService.getGroupReportedPosts(groupId).subscribe(
      (result) => {
        console.log(result.data);
        if (result.data.length < 1 ){
          /*this mean no reports*/
        } else {
          console.log(result.data);
          this.PostsReportList = result.data;
          this.FilteredPostsReportList = result.data;
        }
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
  /*Utils Methods*/
  openSnackBar(message: string, action: string , config: any): void {
    this.snackBar.open(message, action, config);
  }
  refreshList(): void {
    this.FilteredPostsReportList =  this.PostsReportList
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
