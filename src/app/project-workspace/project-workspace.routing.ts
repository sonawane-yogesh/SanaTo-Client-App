import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadProjectComponent } from './upload-project/upload-project.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';

const projectWorkspaceRoutes: Routes = [
    {
        path: '',
        component: UploadProjectComponent,
    }, {
        path: 'view-projects',
        component: ViewProjectsComponent        
    }
];

@NgModule({
    imports: [RouterModule.forChild(projectWorkspaceRoutes)],
    exports: [RouterModule]
})
export class ProjectWorkspaceRoutingModule { }
