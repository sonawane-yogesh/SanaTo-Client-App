import { Component, Input } from '@angular/core';
import { LogMessageService } from 'src/app/services/alert-message.service';
import { axios } from "../../utils";

@Component({
  selector: 'project-upload',
  templateUrl: './project-upload.component.html',
  styleUrls: ['./project-upload.component.css']
})
export class ProjectUploadComponent {
  constructor(private msgObj: LogMessageService) { }
  @Input() uploadConfig: {
    id: string;
    placeHolder: string;
    allowExtensions: string;
    multiple: boolean;
    maxSize: number;
    uploadDirName: string;
    uploadApi: {
      url: string,
      successCallback: ({ }) => {},
      errorCallback: ({ }) => {}
    }
  };
  get fileCtrl(): string {
    return this.uploadConfig.id + '-fileUpload';
  };
  get selectedFiles(): string {
    return this.uploadConfig.id + "-selected-files";
  };
  get uploadBtn(): string {
    return this.uploadConfig.id + "-btnUpload";
  };
  get msgTd(): string {
    return this.uploadConfig.id + '-tdMsg';
  };
  triggerClick() {
    const fileCtrl = this.fileCtrl;
    let file = document.getElementById(fileCtrl);
    this.msgObj.clear(this.msgTd);
    file.click();
  };
  showSelected() {
    let file: any = document.getElementById(this.fileCtrl);
    var files = file.files;
    var selectedFiles: any = document.getElementById(this.selectedFiles);
    selectedFiles.value = `${files.length} file(s) selected`;
    this.msgObj.clear(this.msgTd);
  }
  uploadDocuments() {
    let uploadUrl = this.uploadConfig.uploadApi.url + "?uploadDirName=" + this.uploadConfig.uploadDirName;
    let file: any = document.getElementById(this.fileCtrl);
    var files = file.files;
    if (files.length <= 0) {
      this.msgObj.showMessage(this.msgTd, "No file(s) selected!", "i");
      return false;
    }
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append("uploads", files[index]);
    }
    var config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        percentCompleted = isNaN(percentCompleted) ? 0 : percentCompleted;
        var upload = `Uploading... ${percentCompleted} %`;
        this.msgObj.showMessage(this.msgTd, upload, "s");
      }.bind(this)
    };
    axios.post(uploadUrl, formData, config).then((response) => {
      if (response.status === 200) {
        var sMsg = ".zip file uploaded successfully... wait for moment...";
        this.msgObj.showMessage(this.msgTd, sMsg, "s");
        if (typeof this.uploadConfig.uploadApi.successCallback === "function") {
          setTimeout(() => {
            this.uploadConfig.uploadApi.successCallback(response.data); 
            this.msgObj.showMessage(this.msgTd, "Completed...", "s");
          }, 2000);
        }
      } else if (response.status === 400) {
        this.msgObj.showMessage(this.msgTd, response.data.responseText, "e");
      }
    }).catch((err) => {
      var rData = err.response !== undefined ? err.response.data : null;
      var eMsg = (rData !== undefined && rData !== null) ? rData.Message : err.message;
      this.msgObj.showMessage(this.msgTd, eMsg, "e");
      if (typeof this.uploadConfig.uploadApi.errorCallback === "function") setTimeout(() =>
      { this.uploadConfig.uploadApi.errorCallback(err); }, 2000);
    });
  };
}
