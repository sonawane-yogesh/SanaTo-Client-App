import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseCommands } from '../../models/base-commands';
import { BaseRepository } from 'src/app/base-repositories/BaseRepository';
import { HttpClient } from '@angular/common/http';
import { ext } from "../../utils";
import { FileTypeMaster, LanguageMaster } from '../../models';
import { FloKaptureService } from "../../base-repositories/FloKaptureService";
declare var $: any;

@Component({
  selector: 'base-command-settings',
  templateUrl: './base-command-settings.component.html',
  styleUrls: ['./base-command-settings.component.css']
})
export class BaseCommandSettingsComponent extends BaseRepository<BaseCommands> implements AfterViewInit {
  constructor(protected httpClient: HttpClient, private floKaptureService: FloKaptureService) {
    super(httpClient);
  }
  public fileTypeMasters: Array<FileTypeMaster> = [];
  public allLanguages: Array<LanguageMaster> = [];
  ngAfterViewInit(): void {
    this.floKaptureService.languageMaster.getAllItems("language-master/get-all").subscribe((languages) => {
      this.allLanguages = languages;
    });
  }

  getFileTypeDetails($event: any) {
    const languageId = $event.target.value;
    this.floKaptureService.fileTypeMaster.getItemsByFilterQuery("file-type-master/get-documents", {
      LanguageId: languageId
    }).subscribe(
      (ftm) => {
        this.fileTypeMasters = ftm;
      },
      (err) => {
        console.log(err);
      });
  }

  public message = {
    text: "",
  };

  public statusMessage: any = "";

  public baseCommands: BaseCommands = {
    LanguageId: null,
    FileTypeMasterId: null,
    IfStart: ["^\\s+IF\\s+"],
    IfEnd: ["END", "END-IF"],
    BlockComment: { Start: "/*", End: "*/" },
    CallExternal: ["^CALL\\s+", "^PH\\s+", "^PHANTOM\\s+", "^EXECUTE\\s+", "^RUN\\s+", "^$INSERT\\s+", "^$INCLUDE\\s+"],
    CallInternal: ["^GOSUB"],
    ClassStart: "",
    ClassEnd: "",
    ElseBlock: "ELSE",
    LineComment: "*",
    Loop: { Start: ["FOR", "LOOP UNTIL", "REPEATE", "DO "], End: ["NEXT"] },
    MethodOrParagraph: { Start: ["^d+[\\s+\\*,1]"], End: "RETURN" },
    CommentWithinLine: "; *",
    FirstLineAsObjectBusinessDesc: true
  };

  submitBaseCommands(form: NgForm) {
    var formValue = form.value;
    var callExt = typeof formValue.CallExternal === "string" ? formValue.CallExternal.split(',') : formValue.CallExternal;
    var isCallExt = callExt.every(ext.isRegExp);
    // if (!isCallExt) return;

    var callInt = typeof formValue.CallInternal === "string" ? formValue.CallInternal.split(',') : formValue.CallInternal;
    var isCallInt = callInt.every(ext.isRegExp);
    // if (!isCallInt) return;

    var ifStart = typeof formValue.IfStart === "string" ? formValue.IfStart.split(',') : formValue.IfStart;
    var isIfStart = ifStart.every(ext.isRegExp);
    // if (!isIfStart) return;

    var mOrPStart = typeof formValue.MethodOrParaStart === "string" ? formValue.MethodOrParaStart.split(',') : formValue.MethodOrParaStart;
    var isMethodStart = mOrPStart.every(ext.isRegExp);

    if (!(isMethodStart && isMethodStart && isCallInt && isCallExt && isIfStart)) {

      return;
    }

    this.baseCommands.IfStart = ifStart;
    this.baseCommands.CallInternal = callInt;
    this.baseCommands.CallExternal = callExt;
    this.baseCommands.BlockComment = {
      Start: formValue.BlockCommentStart,
      End: formValue.BlockCommentEnd,
    };
    this.baseCommands.Loop = {
      Start: formValue.LoopStart,
      End: formValue.LoopEnd
    };
    this.baseCommands.MethodOrParagraph = {
      Start: mOrPStart,
      End: formValue.MethodOrParaEnd
    };

    this.addItem("base-command-master/add-item", this.baseCommands).subscribe(() => {
      this.message.text = "Base command references saved successfully.";
    });
  }
}
