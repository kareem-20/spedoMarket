import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Item } from 'src/app/interfaces/item';
import { DataService } from '../../services/data.service';
import { HelperService } from '../../services/helper.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  item: Item;

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
    private dataService: DataService,
    private helper: HelperService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.item = this.dataService.getParams().item;
    // this.item
  }


  back() {
    this.navCtrl.back();
  }

  toCart() {
    this.navCtrl.navigateForward('/cart')
  }

  detail(item) {
    this.dataService.setParams({ item });
    this.navCtrl.navigateForward('/product-detail');
  }

  toggleFav(item: Item) {
    this.cartService.toggleFav(item).then(_ => {
      console.log('item', item)
    })
  }
  increase(item: Item) {
    if (item.addedToCart) {
      this.cartService.cart.forEach(c => {
        if (c.ITEM_CODE === item.ITEM_CODE) c.UNIT_QTY++, item.UNIT_QTY = c.UNIT_QTY;
      })
    } else {
      item.UNIT_QTY++
    }
  }

  decrease(item) {
    if (item.addedToCart) {
      this.cartService.cart.forEach(c => {
        if (c.ITEM_CODE === item.ITEM_CODE) c.UNIT_QTY--, item.UNIT_QTY = c.UNIT_QTY;
      })
    } else {
      item.UNIT_QTY--
    }
  }

  addToCart() {
    if (!this.item.addedToCart) {
      this.cartService.addToCart(this.item);
      this.item.addedToCart = true;
    }
  }


}
