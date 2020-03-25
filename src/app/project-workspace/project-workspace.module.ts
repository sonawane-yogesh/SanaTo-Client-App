import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadProjectComponent } from './upload-project/upload-project.component';
import { ProjectWorkspaceRoutingModule } from './project-workspace.routing';
import { LayoutModule } from '../layout/layout.module';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { ProjectUploadComponent } from '../components/project-upload/project-upload.component';
import { FormsModule } from '@angular/forms';
import { LogMessageService } from '../services/alert-message.service';

@NgModule({
  declarations: [UploadProjectComponent, ProjectUploadComponent, ViewProjectsComponent],
  imports: [ProjectWorkspaceRoutingModule, CommonModule, LayoutModule, FormsModule],
  providers: [LogMessageService]
})
export class ProjectWorkspaceModule { }
