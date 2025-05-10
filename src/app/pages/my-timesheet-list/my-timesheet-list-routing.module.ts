import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTimesheetListPage } from './my-timesheet-list.page';

const routes: Routes = [
  {
    path: '',
    component: MyTimesheetListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTimesheetListPageRoutingModule {}
