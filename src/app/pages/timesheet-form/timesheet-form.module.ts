import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimesheetFormPageRoutingModule } from './timesheet-form-routing.module';

import { TimesheetFormPage } from './timesheet-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimesheetFormPageRoutingModule
  ],
  declarations: [TimesheetFormPage]
})
export class TimesheetFormPageModule {}
