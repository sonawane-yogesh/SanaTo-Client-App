import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FloKaptureService } from 'src/app/base-repositories/FloKaptureService';
import { UserMaster } from 'src/app/models';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor(private router: Router, private floKaptureService: FloKaptureService) { }
  public userModel = {
    userName: "yogeshs",
    password: "Yogesh@123"
  }
  public message = "";
  userLogin(ngForm: NgForm) {
    localStorage.setItem("activeMenu", "icon-home");
    console.log(ngForm.value);
    this.floKaptureService.userMaster
      .executeAction({ type: "post", endPoint: "user-master/user-login", data: ngForm.value as UserMaster })
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      }, (err) => {
        console.log(err);
      });
  };
  openWin(url: string, activeMenu: string, event: Event) {
    localStorage.setItem("activeMenu", activeMenu);
    this.router.navigate([url]);
  };
};
