import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressConfigPage } from './address-config.page';

const routes: Routes = [
  {
    path: '',
    component: AddressConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressConfigPageRoutingModule {}
