import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from './layout/layout.module';
import { CommonModule } from '@angular/common';
import { ApiInterceptor } from "./base-repositories/api-interceptor";

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, LayoutModule, CommonModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/