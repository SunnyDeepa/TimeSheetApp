import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingReviewTimesheetViewPage } from './pending-review-timesheet-view.page';

const routes: Routes = [
  {
    path: '',
    component: PendingReviewTimesheetViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingReviewTimesheetViewPageRoutingModule {}
