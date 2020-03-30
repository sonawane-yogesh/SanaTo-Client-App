import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DataTrainingMaster } from "src/app/helpers/models/data-traning-model";
import { SanaToService } from "src/app/base-repositories/SanaToService";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public headers: Array<string>;
  public fileDetails: any;
  @ViewChild("f", { static: true }) form: NgForm;
  public config = {
    id: "sanaTo",
    placeHolder: "Choose File",
    allowExtensions: "csv",
    multiple: true,
    maxSize: 999999,
    uploadDirName: "uplodedFiles",
    uploadApi: {
      url: `parse-csv/upload-file`,
      successCallBack: () => {},
      errorCallback: () => {}
    }
  };
  constructor(private sanaToService: SanaToService) {}
  ngOnInit() {}
  getResponse(event: any) {
    this.headers = event.headers;
    this.fileDetails = event.uploadDetails;
    console.log("response data in dashboard page", event);
  }
  submitFile() {
    var data = this.form.value;
    var trainModel = new DataTrainingMaster(data);
    trainModel.FileDetails = this.fileDetails;
    this.sanaToService.dataTrainingMaster
      .addItem("parse-csv/add-data-model", trainModel)
      .subscribe(result => {
        this.form.resetForm();
               
      });
    // console.log("uploaded File details:", this.fileDetails);
    // console.log("form values", trainModel);
  }
}
