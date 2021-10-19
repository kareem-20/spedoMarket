import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HelperService } from '../../services/helper.service';
import { CartService } from '../../services/cart.service';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart: Item[] = this.cartService.cart;
  totalCash: number;
  deliveryCost: number = 30;
  constructor(
    private navCtrl: NavController,
    private helper: HelperService,
    private cartService: CartService
  ) {
  }

  ngOnInit() {

    this.getTotal();
    // this.cart =;
    // console.log('this.cart', this.cartService.cart);

  }

  back() {
    this.navCtrl.navigateBack('/tabs/home');
  }

  decrease(i) {
    this.cartService.decrease(i);
    this.getTotal();
  }

  increase(i) {
    this.cartService.increase(i);
    this.getTotal();
  }

  remove(i) {
    this.cartService.remove(i);
    this.getTotal();
  }

  confirm() {
    this.navCtrl.navigateForward('/confirm')
  }

  getTotal() {
    this.totalCash = this.cartService.cart.reduce((i, j) => i + j.UNIT_QTY * j.PRICE_SALE_1, 0) + this.deliveryCost;
    this.cartService.totalCash = this.totalCash;
    console.log('total cash', this.totalCash)
  }

}
