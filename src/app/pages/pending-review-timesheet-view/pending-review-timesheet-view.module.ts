import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingReviewTimesheetViewPageRoutingModule } from './pending-review-timesheet-view-routing.module';

import { PendingReviewTimesheetViewPage } from './pending-review-timesheet-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingReviewTimesheetViewPageRoutingModule
  ],
  declarations: [PendingReviewTimesheetViewPage]
})
export class PendingReviewTimesheetViewPageModule {}
