import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GroupService} from '../../../../Services/group.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IGroup} from '../../../../models/IGroup';
import {IJoinRequest} from '../../../../models/IJoinRequest';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {JoinRequestService} from '../../../../Services/join-request.service';

@Component({
  selector: 'app-group-joined-requests',
  templateUrl: './group-joined-requests.component.html',
  styleUrls: ['./group-joined-requests.component.css']
})
export class GroupJoinedRequestsComponent implements OnInit {
  JoinRequestList: IJoinRequest[] = [];
  FilteredJoinRequestList: IJoinRequest[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.JoinRequestList.length;
  constructor(
    private groupService: GroupService ,
    private joinRequestService: JoinRequestService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getGroupJoinRequests(16);
  }
  getGroupJoinRequests(groupId: any): void{
    this.groupService.getGroupJoinRequests(groupId).subscribe(
      (result) => {
        console.log(result.data);
        if (result.data.length < 1 ){
          /*this mean user doesnt send any Join Request*/
        } else {
          console.log(result.data);
          this.JoinRequestList = result.data;
          this.FilteredJoinRequestList = result.data;
          console.log(this.JoinRequestList);
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
  refuseJoinRequest(Id: any): void{
    this.JoinRequestList = this.JoinRequestList.filter(ele => ele.joinRequestId !== Id);
    this.FilteredJoinRequestList = this.JoinRequestList;
    this.joinRequestService.refuseJoinRequest(Id).subscribe(
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
  acceptJoinRequest(Id: any): void{
    this.JoinRequestList = this.JoinRequestList.filter(ele => ele.joinRequestId !== Id);
    this.FilteredJoinRequestList = this.JoinRequestList;
    this.joinRequestService.acceptJoinRequest(Id).subscribe(
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
  /*Utils Methods*/
  openSnackBar(message: string, action: string , config: any): void {
    this.snackBar.open(message, action, config);
  }
  refreshList(): void {
    this.FilteredJoinRequestList =  this.JoinRequestList
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
