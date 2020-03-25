import { Component } from '@angular/core';
import { FileTypeMaster, LanguageMaster } from '../../models';
import { FloKaptureService } from '../../base-repositories/FloKaptureService';


@Component({
  selector: 'app-file-type-master',
  templateUrl: './file-type-master.component.html',
  styleUrls: ['./file-type-master.component.css']
})
export class FileTypeMasterComponent {
  public fileTypeMaster: FileTypeMaster = {
    FileTypeExtension: "",
    FileTypeName: "",
    LanguageId: null,
    Color: "",
    Delimiter: "",
    FolderNames: []
  };
  public allLanguages: LanguageMaster[];
  public fileTypeMasters: FileTypeMaster[];
  constructor(private floKaptureService: FloKaptureService) {
    this.floKaptureService.languageMaster.getAllItems("language-master/get-all")
    .subscribe((languages) => {
      this.allLanguages = languages;
    });
    this.floKaptureService.fileTypeMaster.getAllItems("file-type-master/get-all")
    .subscribe((ftm) => {
      this.fileTypeMasters = ftm;
    });
  }
  submitFileTypeMaster() {
    var folderNames = this.fileTypeMaster.FolderNames.toString();
    this.fileTypeMaster.FolderNames = folderNames.split(",");
    this.floKaptureService.fileTypeMaster.addItem("file-type-master/add-item", this.fileTypeMaster).subscribe(() => {      
      this.floKaptureService.fileTypeMaster.getAllItems("file-type-master/get-all")
        .subscribe((ftm) => {
          this.fileTypeMasters = ftm;
        });
    });
  }
}
