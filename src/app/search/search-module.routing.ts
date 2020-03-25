import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { KeywordSearchComponent } from './keyword-search/keyword-search.component';
import { ObjectSearchComponent } from './object-search/object-search.component';
import { AssociatedItemsComponent } from './associated-items/associated-items.component';

const searchRouteRoutes: Routes = [{
    path: '',
    component: KeywordSearchComponent
}, {
    path: 'object-search',
    component: ObjectSearchComponent
}, {
    path: 'associated-items',
    component: AssociatedItemsComponent
}, {
    path: 'keyword-search',
    component: KeywordSearchComponent
}
];

@NgModule({
    imports: [RouterModule.forChild(searchRouteRoutes)],
    exports: [RouterModule]
})

export class SearchRoutingModule { }