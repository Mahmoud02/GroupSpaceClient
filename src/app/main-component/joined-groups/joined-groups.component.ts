import { Component, OnInit } from '@angular/core';
import {IGroup} from '../../models/IGroup';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupService} from '../../Services/group.service';
import {GroupTypesService} from '../../Services/group-types.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {IGroupMember} from '../../models/IGroupMember';

@Component({
  selector: 'app-joined-groups',
  templateUrl: './joined-groups.component.html',
  styleUrls: ['./joined-groups.component.css']
})
export class JoinedGroupsComponent implements OnInit {
  GroupsList: IGroup[] = [];
  user: any;
  userId: any;
  constructor(
    private groupService: GroupService,
    private groupTypesService: GroupTypesService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = JSON.parse( localStorage.getItem('userData') as string);
    this.userId = this.user.userId;
  }

  ngOnInit(): void {
    this.getUserJoinedGroups(this.userId);
  }
  /*get user Groups */
  getUserJoinedGroups(userId: any): void{
    this.groupService.getUserJoinedGroups(userId).subscribe(
      (result) => {
        console.log(result.data);
        if (result.data.length < 1 ){
          this.openSnackBar('You are not Joined any Group yet', 'close', {duration: 2000});
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
  /*Utils Methods*/
  openSnackBar(message: string, action: string , config: any): void {
    this.snackBar.open(message, action, config);
  }
  setDropDownListVisibility(ele: any): void{
    if ( ele.style.display === 'inline-block'){
      ele.style.display = 'none';
    }else{
      ele.style.display = 'inline-block';
    }
  }
}
