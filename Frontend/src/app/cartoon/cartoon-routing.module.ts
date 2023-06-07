import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartoonPage } from './cartoon.page';

const routes: Routes = [
  {
    path: '',
    component: CartoonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartoonPageRoutingModule {}
