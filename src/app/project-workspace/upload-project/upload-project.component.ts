import { Component, AfterContentInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectMaster, WorkspaceMaster } from 'src/app/models/project-master';
import { LanguageMaster } from 'src/app/models/language-master';
import { FloKaptureService } from 'src/app/base-repositories/FloKaptureService';
import { LogMessageService } from 'src/app/services/alert-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css']
})
export class UploadProjectComponent implements AfterContentInit {
  constructor(private route: Router, private floKaptureService: FloKaptureService, private msgService: LogMessageService) { }
  public allLanguages: LanguageMaster[];
  public workspaces: Array<WorkspaceMaster> = [];
  ngAfterContentInit(): void {
    this.floKaptureService.languageMaster.getAllItems("language-master/get-all").subscribe((languages) => {
      this.allLanguages = languages;
    });
    this.floKaptureService.workspaceMaster.getAllItems("workspace-master/get-all").subscribe((wm) => {
      this.workspaces = wm;
    });
  };

  public projectMaster: ProjectMaster = new ProjectMaster();

  public uploadConfig = {
    maxSize: 50,
    allowExtensions: "*.zip,*.jpg,*.jpeg",
    id: "documentUploader",
    placeHolder: "Please select .zip directory to upload",
    multiple: true,
    uploadDirName: "UploadedProjects",
    uploadApi: {
      url: "project-master/upload-project",
      headers: {},
      successCallback: (d: any) => {
        this.projectMaster.UploadedPath = d.uploadDetails.CompletePath;
        this.projectMaster.UploadDetails = d.uploadDetails;
      },
      errorCallback: function (e: any) {
        console.log(e);
      }
    }
  };

  public workspace: WorkspaceMaster = {
    LanguageId: null,
    WorkspaceName: "",
    WorkspaceDescription: ""
  };
  setVal(control: HTMLSelectElement): void {
    this.workspace.LanguageId = control.value;
  }

  addWorkspace(ngForm: NgForm): void {
    this.workspace = ngForm.value;
    this.floKaptureService.workspaceMaster
      .addItem("workspace-master/add-workspace", this.workspace).subscribe();
    this.floKaptureService.workspaceMaster.getAllItems("workspace-master/get-all").subscribe((wm) => {
      this.workspaces = wm;
    });
  };

  submitProject() {
    const _that = this;
    // this.projectMaster = form.value;
    this.floKaptureService.projectMaster
      .addItem("project-master/add-project", this.projectMaster)
      .subscribe(function (res) {
        // console.log(res);
        _that.msgService.inlineMessage("msg-log", "Project details saved successfully...", "success");
        setTimeout(() => {
          _that.route.navigate(["project-workspace/view-projects"]);
        }, 1000);
      });
  }
}
