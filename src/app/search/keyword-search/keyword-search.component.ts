import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { FloKaptureService } from '../../base-repositories/FloKaptureService';
import { FileTypeMaster, StatementReferenceMaster, FileMaster, FileContentMaster } from '../../models';
import { SearchTextComponent } from '../../components/search-text/search-text.component';
import { Event, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-keyword-search',
  templateUrl: './keyword-search.component.html',
  styleUrls: ['./keyword-search.component.css']
})
export class KeywordSearchComponent implements OnInit, AfterViewInit,AfterContentInit {
  public searchOptions: object = {
    selectedObject: null,
    searchKeyword: "",
    andOrOption: true,
    searchScope: {
      objectName: true,
      objectStatements: true,
      tags: true,
      uploadedDocuments: true
    },
    includeComments: true
  };
  public searchTextConfig = {
    id: "object-source"
  };
  public showResult: boolean = false;
  public objectTypes: Array<FileTypeMaster> = [];
  public searchResults: StatementReferenceMaster | Array<StatementReferenceMaster>=[];
  constructor(private router: Router, private floKaptureService: FloKaptureService, private searchTextComponent: SearchTextComponent) { }
  ngAfterContentInit(): void {
    const results = JSON.parse(localStorage.getItem("searchResults"));
    this.searchResults = results;
  }
  ngAfterViewInit(): void {
    this.floKaptureService.fileTypeMaster.getAllItems("file-type-master/get-all")
      .subscribe(f => { this.objectTypes = f });
  };
  submitSearchDetails(): void {
    this.floKaptureService.statementReferenceMaster.executeAction({
      type: "post", endPoint: "keyword-search/keyword-search", data: this.searchOptions
    }).subscribe(res => {
      this.searchResults = res;
      localStorage.setItem("searchResults", JSON.stringify(res));
      this.showResult = true;
    });
  };
  doAction(option: string, fileMaster: FileMaster): void {
    if(option === "view"){
      this.router.navigate(["search/object-search", JSON.stringify(this.searchOptions)]);                        
    }else{
      this.searchTextComponent.searchTextConfig = this.searchTextConfig;
          this.floKaptureService.fileContentMaster.getDocument("file-content-master/get-doc?fileId=" + fileMaster._id)
            .subscribe((fileContentMaster: FileContentMaster) => {
              this.searchTextComponent.setText.call(this.searchTextComponent, fileContentMaster.FileContent);
            }, (err) => { console.log(err); });
          }  
        };
  searchOptionChange($event: Event): void {
    console.log($event);
  };
  ngOnInit() { }
}
