import { NgModule } from "@angular/core";
import { UserActivitiesRoutingModule } from './user-activities.routing';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserActivitiesComponent } from './user-activities.component';
import { FormsModule } from '@angular/forms';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, FormsModule, UserActivitiesRoutingModule],
    declarations: [UserActivitiesComponent, UserLoginComponent, UserSignupComponent]
})

export class UserActivitiesModule { }