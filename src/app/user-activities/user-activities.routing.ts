import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

const userActivitiesRoutes: Routes = [
    {
        path: '',
        component: UserLoginComponent
    }, {
        path: 'user-login',
        component: UserLoginComponent
    }, {
        path: "user-activities/signup",
        component: UserSignupComponent
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(userActivitiesRoutes)
    ],
    exports: [RouterModule]
})

export class UserActivitiesRoutingModule { }