import { Component, OnInit } from '@angular/core';
import { RoleMaster } from 'src/app/models';
import { NgForm } from '@angular/forms';
import { FloKaptureService } from 'src/app/base-repositories/FloKaptureService';
declare var $: any;

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  constructor(private floKaptureService: FloKaptureService) {
    this.floKaptureService.roleMaster.getAllItems("role-master/get-all")
      .subscribe(this.renderTable);
  }
  public roleMaster: RoleMaster = {
    RoleName: "",
    RoleDescription: ""
  };
  ngOnInit() { }
  submitRole(roleForm: NgForm): void {
    this.floKaptureService.roleMaster.addItem("role-master/add-role", roleForm.value as RoleMaster)
      .subscribe(() => {
        this.floKaptureService.roleMaster.getAllItems("role-master/get-all")
          .subscribe();
      });
  }
  renderTable(data: Array<RoleMaster>) {
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
      columns: [{}, { data: "RoleName" }, { data: "RoleDescription" }],
      columnDefs: [
        {
          targets: 0,
          defaultContent: '',
          className: 'select-checkbox',
          checkboxes: {
            selectRow: true
          }
        }
      ],
      select: {
        style: 'single'
      },
      order: [[1, 'asc']]
    });
    dataTable.on('select.dt', function (e, dt, type, indexes) {
      var rowData = dt.row(indexes).data();
    });
  }
}
