import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const roleManagementRoutes: Routes = [
    {
        path: '',
        component: ManageRolesComponent
    }, {
        path: 'manage-users',
        component: ManageUsersComponent
    }, {
        path: "manage-roles",
        component: ManageRolesComponent
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(roleManagementRoutes)
    ],
    exports: [RouterModule]
})

export class RoleManagementRoutingModule { }