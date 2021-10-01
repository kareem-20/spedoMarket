import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordDonePageRoutingModule } from './password-done-routing.module';

import { PasswordDonePage } from './password-done.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordDonePageRoutingModule
  ],
  declarations: [PasswordDonePage]
})
export class PasswordDonePageModule {}
