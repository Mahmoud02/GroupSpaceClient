import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupService} from '../../Services/group.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {style} from '@angular/animations';

@Component({
  selector: 'app-show-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit {

  constructor(private modalService: NgbModal, private groupService: GroupService, private snackBar: MatSnackBar ) { }
  closeResult = '';
  /*save group*/
  isPrivate = false;
  ngOnInit(): void {
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
  saveGroup(modal: any, groupName: string, groupDescription: string, groupPhoto: string, groupPrivate: boolean): void {
    if (groupName && groupDescription){
      const savedGroupObj = {
        Name: groupName,
        Description: groupDescription,
        CoverPhotoUrl: groupPhoto,
        Private: groupPrivate,
        GroupTypeId: 1
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
}
