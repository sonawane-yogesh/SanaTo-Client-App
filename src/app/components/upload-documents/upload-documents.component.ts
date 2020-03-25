import { OnInit, Input, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogMessageService } from 'src/app/services/alert-message.service';

@Component({ selector: 'upload-documents', templateUrl: './upload-documents.html', styleUrls: ['./upload-documents.css'] })

export class UploadDocumentsComponent implements OnInit {
    constructor(private httpClient: HttpClient, private msgObj: LogMessageService) { };
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
            errorCallback: any
        }
    };
    get fileCtrl(): string {
        return this.uploadConfig.id + '-fileUpload';
    };
    get selectedFiles(): string {
        return this.uploadConfig.id + "-selected-files";
    }
    get uploadBtn(): string {
        return this.uploadConfig.id + "-btnUpload";
    }
    get msgTd(): string {
        return this.uploadConfig.id + '-tdMsg';
    }
    ngOnInit(): void { };
    triggerClick(args: any) {
        const fileCtrl = this.fileCtrl;
        let file = document.getElementById(fileCtrl);
        this
            .msgObj
            .clear(this.msgTd);
        file.click();
    };
    showSelected() {
        let file: any = document.getElementById(this.fileCtrl);
        var files = file.files;
        var selectedFiles: any = document.getElementById(this.selectedFiles);
        selectedFiles.value = files.length + " file(s) selected";
        this
            .msgObj
            .clear(this.msgTd);
    };

    uploadDocuments() {
        let uploadUrl = this.uploadConfig.uploadApi.url + "?uploadDirName=" + this.uploadConfig.uploadDirName;
        let file: any = document.getElementById(this.fileCtrl);
        var files = file.files;
        if (files.length <= 0) {
            this
                .msgObj
                .showMessage(this.msgTd, "No file(s) selected!", "info");
            return false;
        }
        const formData = new FormData();
        for (let index = 0; index < files.length; index++) {
            formData.append("uploads", files[index]);
        }
        this
            .httpClient
            .post(uploadUrl, formData)
            .pipe(files => files)
            .subscribe(d => {
                if (this.uploadConfig.uploadApi.successCallback)
                    this.uploadConfig.uploadApi.successCallback(d);
                this
                    .msgObj
                    .showMessage(this.msgTd, JSON.stringify(d, undefined, 4), "success");
            }, e => {
                this
                    .msgObj
                    .showMessage(this.msgTd, JSON.stringify(e, undefined, 4), "success");
            });
    };
}