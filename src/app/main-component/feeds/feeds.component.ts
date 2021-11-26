import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupService} from '../../Services/group.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IGroup} from '../../models/IGroup';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  constructor(private modalService: NgbModal, private groupService: GroupService, private snackBar: MatSnackBar ) { }
  GroupsList: IGroup[] = [];

  ngOnInit(): void {
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
          console.log(result.data);
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
  openSnackBar(message: string, action: string , config: any): void {
    this.snackBar.open(message, action, config);
  }
}
