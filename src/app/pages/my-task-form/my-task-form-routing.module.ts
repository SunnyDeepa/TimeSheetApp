import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTaskFormPage } from './my-task-form.page';

const routes: Routes = [
  {
    path: '',
    component: MyTaskFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTaskFormPageRoutingModule {}
