import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageMasterComponent } from './language-master/language-master.component';
import { BaseCommandSettingsComponent } from './base-command-settings/base-command-settings.component';
import { FileTypeMasterComponent } from './file-type-master/file-type-master.component';

const routes: Routes = [
  {
    path: '',
    component: LanguageMasterComponent,
  }, {
    path: 'command-settings',
    component: BaseCommandSettingsComponent
  }, {
    path: 'file-type-master',
    component: FileTypeMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageSettingsRoutingModule { }
