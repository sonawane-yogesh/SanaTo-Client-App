import { Component, AfterViewInit } from '@angular/core';
import { FloKaptureService } from 'src/app/base-repositories/FloKaptureService';
import { FileTypeMaster, StatementReferenceMaster, FileMaster } from '../../models';
import { SearchTextComponent } from '../../components/search-text/search-text.component';
import { from } from "rxjs";
import { filter, take, skip, toArray } from "rxjs/operators";
declare var $: any;

@Component({
  selector: 'app-object-search',
  templateUrl: './object-search.component.html',
  styleUrls: ['./object-search.component.css']
})
export class ObjectSearchComponent implements AfterViewInit {
  constructor(private floKaptureService: FloKaptureService, private searchTextComponent: SearchTextComponent) { }
  public searchTextConfig = {
    id: "object-source"
  };
  public searchOptions = {
    ObjectType: null,
    SelectedObject: null,
    SearchKeyword: ""
  };
  public fileMasters: FileMaster | Array<FileMaster>;
  public fileTypeMaster: Array<FileTypeMaster>;
  public objParagraphs: Array<StatementReferenceMaster> = null;
  public selectedParagraph: string = null;
  public statementReferenceMaster: Array<StatementReferenceMaster>;
  ngAfterViewInit(): void {
    this.floKaptureService.fileTypeMaster.getAllItems("file-type-master/get-all")
      .subscribe((ftm) => {
        this.fileTypeMaster = ftm;
      });
  };
  getAllObjects(): void {
    this.floKaptureService.fileMaster.executeAction({
      endPoint: "file-master/get-documents", type: "post", data: {
        FileTypeMasterId: this.searchOptions.ObjectType,
        FileNameWithoutExt: this.searchOptions.SearchKeyword
      }
    }).subscribe((res) => {
      this.fileMasters = res;
    })
  };
  submitFileTypeMaster(): void {
    // console.log(this.searchOptions);
    this.searchTextComponent.searchTextConfig = this.searchTextConfig;
    this.floKaptureService.fileContentMaster.getItem("file-content-master/get-doc?fileId=" + this.searchOptions.SelectedObject).subscribe((fcm) => {
      this.searchTextComponent.setText.call(this.searchTextComponent, fcm.FileContent);
    }, (err) => {
      console.log(err);
    });
    this.floKaptureService.statementReferenceMaster.getItemsByFilterQuery("statement-reference-master/get-documents", {
      FileId: this.searchOptions.SelectedObject
    }).subscribe((data) => {
      this.statementReferenceMaster = data;
    });
  };
  getStatements($event: Event): void {
    if (this.statementReferenceMaster && this.statementReferenceMaster.length <= 0) return;
    const skipTill = this.statementReferenceMaster.findIndex((d: StatementReferenceMaster) => d._id === this.selectedParagraph);
    const source = from(this.statementReferenceMaster);
    var filtered =
      source.pipe(
        skip(skipTill),
        filter((value: StatementReferenceMaster) => {
          return value.BaseCommandId === "5e0b1e9f957f49a4fa650558" || value.BaseCommandId === "5e0b1eb1957f49a4fa65055e";
        }), take(2), toArray());
    filtered.subscribe((srm) => {
      if (srm && srm.length <= 1) return;
      const referenceFilter = {
        gte: srm.shift()._id,
        lte: srm.shift()._id,
        fileId: this.searchOptions.SelectedObject
      };
      this.floKaptureService.statementReferenceMaster.executeAction({
        endPoint: "statement-reference-master/decision-matrix",
        data: referenceFilter,
        type: "post"
      }).subscribe((response: any) => {
        $("#decision-matrix").html("").html(response.decisionHtml);
      });
    });
  };
  getObjectParagraphs(): void {
    this.floKaptureService.statementReferenceMaster.getItemsByFilterQuery("statement-reference-master/get-documents", { FileId: this.searchOptions.SelectedObject, MethodName: { $nin: [null, ''] } })
      .subscribe(docs => {
        this.objParagraphs = docs;
      });
  };
}
