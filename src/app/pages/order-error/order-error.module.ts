import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderErrorPageRoutingModule } from './order-error-routing.module';

import { OrderErrorPage } from './order-error.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderErrorPageRoutingModule
  ],
  declarations: [OrderErrorPage]
})
export class OrderErrorPageModule {}
