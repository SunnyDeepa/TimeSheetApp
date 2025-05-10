import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTaskPage } from './my-task.page';

const routes: Routes = [
  {
    path: '',
    component: MyTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTaskPageRoutingModule {}
