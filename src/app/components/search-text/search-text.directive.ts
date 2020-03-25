import {Directive, ViewContainerRef} from '@angular/core';
@Directive({selector: '[search-text]'})
export class SearchTextDirective {
    constructor(public viewContainerRef : ViewContainerRef) {}
}