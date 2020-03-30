import { Component, OnInit } from '@angular/core';
import { SanaToService } from 'src/app/base-repositories/SanaToService';
import { Router } from '@angular/router';
import { UserMaster } from 'src/app/models';

@Component({ selector: 'user-signup', templateUrl: './user-signup.component.html', styleUrls: ['./user-signup.component.css'] })
export class UserSignupComponent implements OnInit {
  public Username: string = "";
  public FirstName: string = "";
  public LastName: string = "";
  public Email: string = "";
  public Password: string = "";
  public ConfirmPassword: string = "";

  public model: UserMaster = {
    FirstName: "",
    LastName: "",
    Password: "",
    ConfirmPassword: "",
    Username: "",
    Email: ""
  };

  /*
  public model: UserMaster = {
    FirstName: "Yogesh",
    LastName: "Sonawane",
    Password: "Yogesh@123",
    ConfirmPassword: "Yogesh@123",
    Username: "yogeshs",
    Email: "sonawaneyogeshb@gmail.com"
  };
  */
  public loading = false;
  constructor(private router: Router, private SanaToService: SanaToService) { }
  ngOnInit() { }
  createAccount() {
    var userModel = this.model;
    this.loading = true;
    this
      .SanaToService
      .userMaster.addItem("user-master/add-user", userModel)
      .subscribe(data => {
        console.log(data);
        this
          .router
          .navigate(['/user-activities/login']);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
  };  
}
