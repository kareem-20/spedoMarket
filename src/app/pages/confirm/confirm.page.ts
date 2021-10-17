import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from '../../services/cart.service';
import { Address } from '../../interfaces/address';
import { ChangeAddressPage } from '../change-address/change-address.page';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  userId = this.authService.userData._id;
  totalCash = this.cartService.totalCash;
  cart = this.cartService.cart;
  address: Address = this.authService.myAddress;

  constructor(
    private navCtrl: NavController,
    private cartService: CartService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    // this.userId
  }

  back() {
    this.navCtrl.navigateBack('/cart')
  }

  selectMethod(ev?: any) {
    if (ev.detail.value === '0') this.cartService.paymentMethod = 'fawry'
    else if (ev.detail.value === '1') this.cartService.paymentMethod = 'onDelivery'
  }

  async changeAddress() {
    let modal = await this.modalCtrl.create({
      component: ChangeAddressPage
    });
    await modal.present();

    let dismiss = await modal.onDidDismiss();
    if (dismiss.data) {
      console.log('data', dismiss.data)
    } else {
      console.log('no data')
    }
  }

  confirm() {
    this.navCtrl.navigateForward('/order-done')
  }

}
