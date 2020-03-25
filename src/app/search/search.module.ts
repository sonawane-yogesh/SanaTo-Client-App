import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeywordSearchComponent } from './keyword-search/keyword-search.component';
import { ObjectSearchComponent } from './object-search/object-search.component';
import { AssociatedItemsComponent } from './associated-items/associated-items.component';
import { FormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search-module.routing';
import { LayoutModule } from '../layout/layout.module';
import { SearchTextComponent } from '../components/search-text/search-text.component';
import { UiSwitchModule } from 'ngx-toggle-switch';

@NgModule({
  declarations: [KeywordSearchComponent, ObjectSearchComponent, AssociatedItemsComponent, SearchTextComponent],
  imports: [CommonModule, FormsModule, SearchRoutingModule, LayoutModule, UiSwitchModule],
  providers: [SearchTextComponent]
})
export class SearchModule { }
