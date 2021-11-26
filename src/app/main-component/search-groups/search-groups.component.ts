import { Component, OnInit } from '@angular/core';
import {IGroup} from '../../models/IGroup';
import {IGroupTypes} from '../../models/IGroupTypes';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupService} from '../../Services/group.service';
import {GroupTypesService} from '../../Services/group-types.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {JoinRequestService} from '../../Services/join-request.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-search-groups',
  templateUrl: './search-groups.component.html',
  styleUrls: ['./search-groups.component.css']
})
export class SearchGroupsComponent implements OnInit {
  GroupsList: IGroup[] = [];
  GroupsIdOfJoinRequest: number[] = [];
  GroupsTypesList: IGroupTypes[] = [];
  closeResult = '';
  user: any;
  userEmail: any;
  userId: any;
  constructor(
    private groupService: GroupService,
    private groupTypesService: GroupTypesService,
    private joinRequestService: JoinRequestService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private oauthService: OAuthService

  ) {
    const claims: any = this.oauthService.getIdentityClaims();
    this.userId = claims.sub;
  }

  ngOnInit(): void {
    this.findGroups();
    this.getGroupsIdOfJoinRequestByUserId(this.userId);
  }
  setDropDownListVisibility(ele: any): void{
    if ( ele.style.display === 'inline-block'){
      ele.style.display = 'none';
    }else{
      ele.style.display = 'inline-block';
    }
  }

  /*get  Groups */
  findGroups(): void{
    this.groupService.findGroups().subscribe(
      (result) => {
        console.log(result.data);
        if (result.data.length < 1 ){
          this.openSnackBar('try again in few moments', 'close', {duration: 2000});
        } else {
          this.GroupsList = result.data;
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
  /*JoinRequests methods*/
  sendJoinRequest(Id: any): void{
    this.GroupsIdOfJoinRequest.push(Id);
    const joinRequestObj = {
     groupId: Id
    };
    this.joinRequestService.sendJoinRequest(joinRequestObj).subscribe(
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
  deleteJoinRequest(Id: any): void{
    this.GroupsIdOfJoinRequest = this.GroupsIdOfJoinRequest.filter(num => num !== Id);
    const joinRequestObj = {
      groupId: Id
    };
    this.joinRequestService.deleteJoinRequest(joinRequestObj).subscribe(
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
  /**
   * This method will get List of Id of Groups
   * that the user send Join Request to It
   **/
  getGroupsIdOfJoinRequestByUserId(userId: any): void{
    this.joinRequestService.getGroupsIdOfJoinRequestByUserId(userId).subscribe(
      (result) => {
        console.log(result.data);
        if (result.data.length < 1 ){
          /*this mean user doesnt send any Join Request*/
        } else {
          this.GroupsIdOfJoinRequest = result.data;
          console.log(this.GroupsIdOfJoinRequest);
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
  IsUserSendJoinRequest(groupId: any): boolean{
    return this.GroupsIdOfJoinRequest.some( id => id === groupId);
  }
}
