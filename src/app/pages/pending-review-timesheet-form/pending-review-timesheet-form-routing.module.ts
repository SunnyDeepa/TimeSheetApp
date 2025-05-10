import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingReviewTimesheetFormPage } from './pending-review-timesheet-form.page';

const routes: Routes = [
  {
    path: '',
    component: PendingReviewTimesheetFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingReviewTimesheetFormPageRoutingModule {}
