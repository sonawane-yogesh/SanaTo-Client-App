import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from '../components/left-menu/left-menu.component';
import { TopHeaderBarComponent } from '../components/top-header-bar/top-header-bar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { PageBreadCrumbComponent } from '../components/page-bread-crumb/page-bread-crumb.component';
import { PagePreloadComponent } from '../components/page-preload/page-preload.component';

@NgModule({
    imports: [RouterModule],
    declarations: [LeftMenuComponent, TopHeaderBarComponent, FooterComponent, PageBreadCrumbComponent, PagePreloadComponent],
    exports: [LeftMenuComponent, TopHeaderBarComponent, FooterComponent, PageBreadCrumbComponent, PagePreloadComponent]
})

export class LayoutModule { }