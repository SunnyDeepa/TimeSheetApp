import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimesheetViewPageRoutingModule } from './timesheet-view-routing.module';

import { TimesheetViewPage } from './timesheet-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimesheetViewPageRoutingModule
  ],
  declarations: [TimesheetViewPage]
})
export class TimesheetViewPageModule {}
