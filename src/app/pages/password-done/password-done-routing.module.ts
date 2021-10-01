import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordDonePage } from './password-done.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordDonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordDonePageRoutingModule {}
