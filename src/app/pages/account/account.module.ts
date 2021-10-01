import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { IonBottomSheetModule } from 'ion-bottom-sheet';
import { IonBottomDrawerModule } from 'ion-bottom-drawer'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    IonBottomSheetModule, IonBottomDrawerModule
  ],
  declarations: [AccountPage]
})
export class AccountPageModule { }
