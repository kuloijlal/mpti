import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BisnisPageRoutingModule } from './bisnis-routing.module';

import { BisnisPage } from './bisnis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BisnisPageRoutingModule
  ],
  declarations: [BisnisPage]
})
export class BisnisPageModule {}
