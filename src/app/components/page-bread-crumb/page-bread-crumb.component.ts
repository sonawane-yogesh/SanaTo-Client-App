import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-page-bread-crumb',
  templateUrl: './page-bread-crumb.component.html'
})
export class PageBreadCrumbComponent implements AfterViewInit {
  constructor(private router: Router) { }
  ngAfterViewInit() {
    var currentPath = this.router.url.match(/([^\/]*)\/*$/).pop();
    // console.log(this.router.url.match(currentPath));
    $("#content-header > div").each(function () { $(this).css({ display: "none" }); });
    var breadCrumb = $(`.${currentPath}`);
    breadCrumb.css({ display: "block" });
  };
}
