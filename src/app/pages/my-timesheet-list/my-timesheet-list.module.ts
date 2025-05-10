import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTimesheetListPageRoutingModule } from './my-timesheet-list-routing.module';

import { MyTimesheetListPage } from './my-timesheet-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTimesheetListPageRoutingModule
  ],
  declarations: [MyTimesheetListPage]
})
export class MyTimesheetListPageModule {}
