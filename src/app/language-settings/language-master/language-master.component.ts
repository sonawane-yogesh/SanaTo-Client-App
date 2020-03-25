import { Component, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseRepository } from "src/app/base-repositories/BaseRepository";
import { LanguageMaster } from 'src/app/models/language-master';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'language-master',
  templateUrl: './language-master.component.html'
})
export class LanguageMasterComponent extends BaseRepository<LanguageMaster> {
  public languages: Array<LanguageMaster>;
  public isLast: boolean;
  exportToCsv() {
    console.log(this);
  };

  public selectedLanguage: LanguageMaster = {
    LanguageId: 0,
    LanguageName: "",
    LanguageDescription: "",
    _id: ""
  };

  public languageMaster: LanguageMaster = {
    LanguageId: 0,
    LanguageName: "",
    LanguageDescription: "",
    _id: ""
  };

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.getAllItems("language-master/get-all").subscribe(res => {
      this.renderTable(res);
    });
  };

  renderTable(data: Array<LanguageMaster>) {
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
      rowId: 'LanguageId',
      columns: [{}, { data: "LanguageName" }, { data: "LanguageDescription" }],
      columnDefs: [
        {
          'targets': 0,
          defaultContent: '',
          className: 'select-checkbox',
          'checkboxes': {
            'selectRow': true
          }
        }
      ],
      'select': {
        'style': 'single'
      },
      'order': [[1, 'asc']]
    });
    dataTable.on('select.dt', function (e, dt, type, indexes) {
      var rowData = dt.row(indexes).data();
      // console.log(rowData);
      _that.selectedLanguage = rowData;
    });
    /*
    dataTable.on('deselect.dt', function (e, dt, type, indexes) {
      var rowData = dt.row(indexes).data();
      console.log(rowData);
    });
    */
  };

  submitLanguage(form: NgForm) {
    var l = form.value as LanguageMaster;
    this.addItem("language-master/add-language", l).subscribe(t => {
      this.getAllItems("language-master/get-all").subscribe(res => {
        this.renderTable(res);
      });
    });
  };
}
