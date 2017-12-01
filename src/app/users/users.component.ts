import { Component, OnInit } from '@angular/core';
import {AppService} from '../service/app.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: any = new Array(); // new User(); // = new Array();
  constructor(private appService: AppService) {
    this.initUserList();
  }

  private initUserList() {
    this.appService.listUser().then(response => {
      this.users = JSON.parse(response._body);
    });
  }

  ngOnInit() {
  }

}
