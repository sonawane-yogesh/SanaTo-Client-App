import { Component, AfterViewInit } from '@angular/core';
import { FloKaptureService } from 'src/app/base-repositories/FloKaptureService';
import { ProjectMaster } from 'src/app/models/project-master';
import { LogMessageService } from 'src/app/services/alert-message.service';
declare var $: any;
@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements AfterViewInit {
  constructor(private floKaptureService: FloKaptureService, private msgService: LogMessageService) { }
  ngAfterViewInit(): void {
    this.floKaptureService.projectMaster.getAllItems("project-master/get-all")
      .subscribe((res) => {
        this.showProjectDetails(res);
      });
  }
  showProjectDetails(data: Array<ProjectMaster>) {
    var _that = this;
    var dataTable = $('.data-table').dataTable({
      bJQueryUI: true,
      pagingType: "full_numbers",
      dom: 'Bfrtip',
      buttons: ['copyHtml5', 'excelHtml5', 'csvHtml5', 'pdfHtml5'],
      stateSave: true,
      retrieve: false,
      destroy: true,
      data: data,
      rowId: '_id',
      columns: [{},
      { data: "ProjectName" },
      { data: "LanguageMaster.LanguageName" },
      { data: "TotalObjects" },
      { data: "UploadedOn" },
      { data: "ProcessedOn" },
      { data: "ProcessingStatus" },
      { data: "Status" },
      {}],
      columnDefs: [
        {
          targets: 0,
          defaultContent: '',
          className: 'select-checkbox',
          checkboxes: {
            selectRow: true
          }
        }, {
          targets: 4,
          render: function (uploadedOn: Date) {
            return new Date(uploadedOn).toLocaleDateString("en-us");
          },
        }, {
          targets: 7,
          render: function (active: Boolean) {
            return active ? "Yes" : "No";
          },
        }, {
          targets: 8,
          defaultContent: '<input type="button" class="s-process" value="Process" style="background-color: #4c7a40; color: white;">&nbsp;<input type="button" class="s-steps" value="Steps" style="background-color: #2981cd; color: white;">',
        }
      ],
      select: {
        style: 'single'
      },
      order: [[1, 'asc']]
    });
    /*
    dataTable.on('select.dt', function (e, dt, type, indexes) {
      var rowData = dt.row(indexes).data();
      console.log(rowData);
      // _that.selectedLanguage = rowData;
    });
    */
    $('.data-table .s-process').on('click', function (e, dt, type, indexes) {
      var d = $('.data-table').dataTable().api();
      var tr = $(this).parents("tr");
      var id = $('.data-table').DataTable().row(tr).index();
      var cellData = d.row([id]).data();
      console.log(cellData.ProjectName);
      _that.startProcess(cellData);
    });
    $('.data-table .s-steps').on('click', function (e, dt, type, indexes) {
      var d = $('.data-table').dataTable().api();
      var tr = $(this).parents("tr");
      var id = $('.data-table').DataTable().row(tr).index();
      var cellData = d.row([id]).data();
      _that.showProcessSteps(cellData._id);
    });
  }
  showProcessSteps(projectId: string): void {
    this.floKaptureService.projectMaster
      .executeAction({ type: "get", endPoint: "project-master/get-process-steps?projectId=" + projectId })
      .subscribe((res) => {
        console.log(res);
      });
  };
  startProcess(cellData: ProjectMaster): void {
    this.floKaptureService.projectMaster
      .executeAction({ type: "post", endPoint: "process-universe-project/start-process", data: cellData })
      .subscribe(() => {
        this.msgService.bootBox.alert({
          message: "Project started for processing...",
          className: 'rubberBand animated',
          backdrop: true
        });
      }, (err) => {
        this.msgService.bootBox.alert({
          message: err.message
        });
      });
  }
}
