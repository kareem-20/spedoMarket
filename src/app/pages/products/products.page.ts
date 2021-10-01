import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  numView: number = 0;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  changeView() {
    if (this.numView == 0) this.numView = 1
    else if (this.numView == 1) this.numView = 0;
  }

  back() {
    this.navCtrl.back();
  }
  toCart() {
    this.navCtrl.navigateForward('/cart')
  }
}
