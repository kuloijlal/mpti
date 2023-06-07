import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BisnisPage } from './bisnis.page';

const routes: Routes = [
  {
    path: '',
    component: BisnisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BisnisPageRoutingModule {}
