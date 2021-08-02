import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../Services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GroupService} from '../../../Services/group.service';
import {IGroupMetaData} from '../../../models/IGroupMetaData';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  groupId: number | undefined;
  groupMetaData: IGroupMetaData = {
    numOfUsers: 0,
    numOfJoinRequests: 0,
    numOfReports: 0,
  };
  constructor(private route: ActivatedRoute, private groupService: GroupService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupId = params.id;
      this.getGroupMetaData(this.groupId);
    });
  }
  getGroupMetaData(groupId: any): void{
    this.groupService.getGroupMetaData(groupId).subscribe(
      (data) => {
        this.groupMetaData = data;
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

}
