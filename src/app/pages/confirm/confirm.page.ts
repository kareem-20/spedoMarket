import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from '../../services/cart.service';
import { Address } from '../../interfaces/address';
import { ChangeAddressPage } from '../change-address/change-address.page';
import { HelperService } from '../../services/helper.service';
import { Order } from '../../interfaces/order';

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
  note: string;

  constructor(
    private navCtrl: NavController,
    private cartService: CartService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private helper: HelperService
  ) { }

  ngOnInit() {
    // this.userId
    // this.address;
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
      // this.helper.showLoading()
      console.log('data', dismiss.data)

      // this.authService.setmyAddress(dismiss.data).the;
      this.address = this.authService.myAddress;

    } else {
      console.log('no data')
    }
  }

  confirm() {
    this.cartService.note = this.note
    this.cartService.confirmOrder();
    // this.navCtrl.navigateForward('/order-done')
  }

}
