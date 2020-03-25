import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RoleManagementRoutingModule } from './role-management.routing';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [ManageRolesComponent, ManageUsersComponent],
  imports: [
    CommonModule, FormsModule, LayoutModule, RoleManagementRoutingModule
  ]
})
export class RoleManagementModule { }
