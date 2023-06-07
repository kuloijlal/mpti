import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartoonPageRoutingModule } from './cartoon-routing.module';

import { CartoonPage } from './cartoon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartoonPageRoutingModule
  ],
  declarations: [CartoonPage]
})
export class CartoonPageModule {}
