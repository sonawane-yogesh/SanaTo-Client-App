import { Injectable } from '@angular/core';
declare var bootbox: any;

@Injectable({
    providedIn: 'root'
})
export class LogMessageService {
    public _defaults: { s: string; w: string; i: string; e: string; d: string; };
    public bootBox: any;
    constructor() {
        this._defaults = {
            s: "green",
            w: "#fcf8e3", 
            i: "#d9edf7", 
            e: "red", 
            d: "green" };
        this.bootBox = bootbox;
    }
    showMessage(id: string, msg: string, type: string) {
        var color = this._defaults[type] || this._defaults['d'];
        var element = document.getElementById(id);
        if (!element) return;
        element.innerHTML = '';
        element.style['color'] = color;
        element.innerHTML = msg;
    };
    log(msg: string) {
        console.log(msg);
    };
    clear(id: string) {
        var element = document.getElementById(id);
        if (!element) return;
        element.innerHTML = '';
    };
    inlineMessage(id: string , msg: string, type: string) {
        var color = this._defaults[type] || this._defaults["d"];
        var control = document.getElementById(id);
        if (!control) return;
        control.innerHTML = "";
        control.style["color"] = color;
        control.innerHTML = msg;
    };

    messageWithReplace(id: string, msg: string, type: string) {
        if (!id) return;
        var color = this._defaults[type] || this._defaults["d"];
        var control = document.getElementById(id);
        if (!control) return;
        control.innerHTML = "";
        control.style["color"] = color;
        control.innerHTML = msg;
    };
    alertMessage(msg: string) {
        alert(msg);
    };
    bootBoxAlert(msg: string, callback: any = null) {
        this.bootBox.alert({
            message: msg,
            callback: function (c: any) {
                if (callback === "function") callback(c);
            }
        });
    };
    bootBoxConfirm(title: string, msg: string, callback: any) {
        this.bootBox.confirm({
            title: title,
            message: msg,
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                callback(result);
            }
        });
    };
    bootBoxLoading(title: string) {
        var dialog = this.bootBox.dialog({
            title: title,
            message: '<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
        });
        return dialog;
    };
}