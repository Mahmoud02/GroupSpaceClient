import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupService} from '../../Services/group.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {IGroup} from '../../models/IGroup';
import {GroupTypesService} from '../../Services/group-types.service';
import {IGroupTypes} from '../../models/IGroupTypes';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent implements OnInit {
  GroupsList: IGroup[] = [];
  GroupsTypesList: IGroupTypes[] = [];
  closeResult = '';
  user: any;
  userEmail: any;
  userId: any;
  constructor(
    private modalService: NgbModal,
    private groupService: GroupService,
    private groupTypesService: GroupTypesService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = JSON.parse( localStorage.getItem('userData') as string);
    this.userEmail = this.user.email;
    this.userId = this.user.userId;
  }
  /*save group*/
  isPrivate = false;
  ngOnInit(): void {
    this.getUserGroups(this.userId);
    this.getGroupTypes();
  }
  open(content: any): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /*Save new Group*/
  saveGroup(modal: any, groupName: string, groupDescription: string, groupTypeId: string, groupPhoto: any, groupPrivate: boolean): void {
    const coverPhoto = groupPhoto.files[0];
    if (groupName && groupDescription && coverPhoto){
      const savedGroupObj = {
        Name: groupName,
        Description: groupDescription,
        CoverPhoto: coverPhoto,
        Private: groupPrivate,
        UserId: this.userId,
        GroupTypeId: groupTypeId
      };
      modal.close();
      this.callSaveGroupApi(savedGroupObj);
    }else{
      this.openSnackBar('Fill The Required Fields !!', 'close',
        {
          duration: 2000,
          panelClass: ['invalidToast']}
      );
    }
  }

  callSaveGroupApi(group: any): void{
    this.groupService.saveGroup(group).subscribe(
      (data) => {
        this.openSnackBar(data.message , 'close', {duration: 2000});
        this.getUserGroups(4);
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
  openSnackBar(message: string, action: string , config: any): void {
    this.snackBar.open(message, action, config);
  }

  navigateToGroupDetails(): void {
    this.router.navigate(['groupDetails']);
  }
  setDropDownListVisibility(ele: any): void{
    if ( ele.style.display === 'inline-block'){
      ele.style.display = 'none';
    }else{
      ele.style.display = 'inline-block';
    }
  }
  /*get user Groups */
  getUserGroups(userId: any): void{
    this.groupService.getUserGroups(userId).subscribe(
      (result) => {
        console.log(result.data);
        if (result.data.length < 1 ){
          this.openSnackBar('You are not create an group yet', 'close', {duration: 2000});
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
  /*getGroupTypes*/
  getGroupTypes(): void{
    this.groupTypesService.getGroupTypes().subscribe(
      (result) => {
        console.log('The Result of types');
        console.log(result.data);
        this.GroupsTypesList = result.data;
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
