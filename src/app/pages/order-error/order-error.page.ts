import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-error',
  templateUrl: './order-error.page.html',
  styleUrls: ['./order-error.page.scss'],
})
export class OrderErrorPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  backToCart() {
    this.navCtrl.navigateBack('/cart');
  }

  tryAgain() {
    this.cartService.confirmOrder();
  }



}
