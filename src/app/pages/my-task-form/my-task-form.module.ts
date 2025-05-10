import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTaskFormPageRoutingModule } from './my-task-form-routing.module';

import { MyTaskFormPage } from './my-task-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTaskFormPageRoutingModule
  ],
  declarations: [MyTaskFormPage]
})
export class MyTaskFormPageModule {}
