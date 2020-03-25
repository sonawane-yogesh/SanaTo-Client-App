import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryMasterComponent } from './country-master/country-master.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { CityMasterComponent } from './city-master/city-master.component';

const regionSettingsRoutes : Routes = [
    {
        path: "",
        component: CountryMasterComponent
    }, {
        path: "state-master",
        component: StateMasterComponent
    }, {
        path: "city-master",
        component: CityMasterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(regionSettingsRoutes)],
    exports: [RouterModule]
})
export class RegionSettingsRoutingModule {}