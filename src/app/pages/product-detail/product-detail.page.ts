import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

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
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back();
  }
  toCart() {
    this.navCtrl.navigateForward('/cart')
  }
}
