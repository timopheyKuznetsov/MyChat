import { Component, OnInit } from '@angular/core';
import {AppService} from '../service/app.service';
import {LoginRequest} from '../data/loginrequest';
import {Router} from '@angular/router';
import {AppDataService} from '../service/appdata.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userName: string;
  private password: string;
  public showErrorMsg: boolean;

  constructor(private router: Router,
    private appService: AppService,
    private appDataService: AppDataService) { }

    doLogin() {
      const loginRequest: LoginRequest = {
        name: this.userName,
        password: this.password
      };

      this.appService.userLogin(loginRequest).then(response => {
        if (response.status !== 401) {
          this.appDataService.userId = JSON.parse(response._body).id;
          this.appDataService.userName = JSON.parse(response._body).userName;
          console.log(this.appDataService.userId, this.appDataService.userName);
          this.router.navigate(['/home']);
        } else {
          this.showErrorMsg = true;
        }
      });
    }

  ngOnInit() {
  }

}
