import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
const routes: Routes = [
    {
        path: '',
        loadChildren: (): Promise<any> => import("./user-activities/user-activities.module").then(ua => ua.UserActivitiesModule)
    }, {
        path: 'dashboard',
        component: DashboardComponent
    }, {
        path: 'project-workspace',
        loadChildren: (): Promise<any> => import("./project-workspace/project-workspace.module").then(pw => pw.ProjectWorkspaceModule)
    }, {
        path: 'role-management',
        loadChildren: (): Promise<any> => import("./role-management/role-management.module").then(rm => rm.RoleManagementModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }