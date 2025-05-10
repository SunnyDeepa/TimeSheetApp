import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTaskPageRoutingModule } from './my-task-routing.module';

import { MyTaskPage } from './my-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTaskPageRoutingModule
  ],
  declarations: [MyTaskPage]
})
export class MyTaskPageModule {}
