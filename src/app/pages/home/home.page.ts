import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 5,
    slidesPerView: 1,
    freeMode: false,
    loop: true
  };

  constructor(
    private navCtrl: NavController,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.cartService.reloadAll();
    this.authService.getCredentials();
  }

  ngOnInit() {
  }

  toCart() {
    this.navCtrl.navigateForward('/cart')
  }

  detail() {
    this.navCtrl.navigateForward('/product-detail')
  }

  viewMore() {
    this.navCtrl.navigateForward('/products')
  }

}
