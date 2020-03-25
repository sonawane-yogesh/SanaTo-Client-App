import { NgModule } from '@angular/core';
import { LanguageSettingsRoutingModule } from './language-settings.routing';
import { LanguageMasterComponent } from './language-master/language-master.component';
import { BaseCommandSettingsComponent } from './base-command-settings/base-command-settings.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileTypeMasterComponent } from './file-type-master/file-type-master.component';

@NgModule({
  declarations: [
    LanguageMasterComponent,
    BaseCommandSettingsComponent,
    FileTypeMasterComponent
  ],
  imports: [
    CommonModule,
    LanguageSettingsRoutingModule,
    LayoutModule,
    FormsModule
  ],
  providers: [FormBuilder]
})
export class LanguageSettingsModule { }
