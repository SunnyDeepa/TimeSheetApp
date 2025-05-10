import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingMyReviewPageRoutingModule } from './pending-my-review-routing.module';

import { PendingMyReviewPage } from './pending-my-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingMyReviewPageRoutingModule
  ],
  declarations: [PendingMyReviewPage]
})
export class PendingMyReviewPageModule {}
