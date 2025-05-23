import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingMyReviewPage } from './pending-my-review.page';

const routes: Routes = [
  {
    path: '',
    component: PendingMyReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingMyReviewPageRoutingModule {}
