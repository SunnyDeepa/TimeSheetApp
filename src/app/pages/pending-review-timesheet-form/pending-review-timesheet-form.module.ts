import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingReviewTimesheetFormPageRoutingModule } from './pending-review-timesheet-form-routing.module';

import { PendingReviewTimesheetFormPage } from './pending-review-timesheet-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingReviewTimesheetFormPageRoutingModule
  ],
  declarations: [PendingReviewTimesheetFormPage]
})
export class PendingReviewTimesheetFormPageModule {}
