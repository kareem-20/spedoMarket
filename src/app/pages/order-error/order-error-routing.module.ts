import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderErrorPage } from './order-error.page';

const routes: Routes = [
  {
    path: '',
    component: OrderErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderErrorPageRoutingModule {}
