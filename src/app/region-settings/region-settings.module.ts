import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateMasterComponent } from './state-master/state-master.component';
import { CityMasterComponent } from './city-master/city-master.component';
import { LayoutModule } from '../layout/layout.module';
import { CountryMasterComponent } from './country-master/country-master.component';
import { RegionSettingsRoutingModule } from './region-settings.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StateMasterComponent, CityMasterComponent, CountryMasterComponent],
  imports: [CommonModule, FormsModule, LayoutModule, RegionSettingsRoutingModule]
})
export class RegionSettingsModule { }
