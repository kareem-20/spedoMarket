import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDonePage } from './order-done.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDonePageRoutingModule {}
