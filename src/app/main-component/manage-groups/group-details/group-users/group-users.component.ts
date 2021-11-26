import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {IJoinRequest} from '../../../../models/IJoinRequest';
import {GroupService} from '../../../../Services/group.service';
import {JoinRequestService} from '../../../../Services/join-request.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IGroupMember} from '../../../../models/IGroupMember';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit{
  GroupMembersList: IGroupMember[] = [];
  FilteredGroupMembersList: IGroupMember[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.GroupMembersList.length;
  GROUP_ID: any;
  constructor(
    private groupService: GroupService ,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute)
  {
    // @ts-ignore
    const routerData = router.getCurrentNavigation().extras.state;
    // @ts-ignore
    console.log('in user');
    console.log(router.getCurrentNavigation());

    // @ts-ignore
    this.GROUP_ID = routerData.state;
  }

  ngOnInit(): void {
    this.getGroupMembers(this.GROUP_ID);
  }
  getGroupMembers(groupId: any): void{
    this.groupService.getGroupMembers(groupId).subscribe(
      (result) => {
        console.log(result.data);
        if (result.data.length < 1 ){
          /*this mean user doesnt send any Join Request*/
        } else {
          console.log(result.data);
          this.GroupMembersList = result.data;
          this.FilteredGroupMembersList = result.data;
          console.log(this.GroupMembersList);
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
    this.FilteredGroupMembersList =  this.GroupMembersList
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  kickUserFromGroup(groupMemberId: number): void {
    this.GroupMembersList = this.GroupMembersList.filter(ele => ele.groupMemberId !== groupMemberId);
    this.FilteredGroupMembersList = this.GroupMembersList;
    this.groupService.kickUserFromGroup(groupMemberId).subscribe(
      (data) => {
        this.openSnackBar(data.message , 'close', {duration: 2000});
      },
      (err) => {
        this.openSnackBar('Something wrong happen during communicate with Api!!', 'close',
          {
            duration: 2000,
            panelClass: ['invalidToast']}
        );
      }
    );
  }
}

