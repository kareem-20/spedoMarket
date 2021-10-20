import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';
import { Item } from '../../interfaces/item';
import { forkJoin } from 'rxjs';
import { DataService } from '../../services/data.service';

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
    loop: true,
  };

  feature: Item[] = [];
  discounts: Item[] = [];
  constructor(
    private navCtrl: NavController,
    private cartService: CartService,
    private authService: AuthService,
    private api: ApiService,
    private helper: HelperService,
    private dataService: DataService
  ) {
    this.cartService.reloadAll();
    this.authService.getCredentials();
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.helper.showLoading();

    forkJoin([
      this.api.getOtherData('/api/item/get-feature'),
      this.api.getOtherData('/api/item/get-discount'),
    ]).subscribe(async (res: any) => {
      for (let i = 0; i < 4; i++) {
        this.feature.push(res[0].data[i]);
        this.discounts.push(res[1].data[i]);

        await Promise.all([this.checkCart(), this.checkFav()]);
      }
      this.helper.dismissLoading();
      console.log('this.feature', this.feature);
      console.log('this.discounts', this.discounts);
    });
  }

  toCart() {
    this.navCtrl.navigateForward('/cart');
  }

  viewMore(type) {
    this.dataService.setParams({ type });
    this.navCtrl.navigateForward('/products/' + true);
  }

  detail(item) {
    this.dataService.setParams({ item });
    this.navCtrl.navigateForward('/product-detail');
  }

  async checkCart() {
    this.feature.forEach((item) => {
      this.cartService.cart.forEach((ca) => {
        if (item.ITEM_CODE === ca.ITEM_CODE) {
          item.addedToCart = true;
          item.UNIT_QTY = ca.UNIT_QTY;
        }
      });
    });
    this.discounts.forEach((item) => {
      this.cartService.cart.forEach((ca) => {
        if (item.ITEM_CODE === ca.ITEM_CODE) {
          item.addedToCart = true;
          item.UNIT_QTY = ca.UNIT_QTY;
        }
      });
    });
  }

  async checkFav() {
    this.feature.forEach((item) => {
      this.cartService.fav.forEach((fav) => {
        if (item.ITEM_CODE === fav.ITEM_CODE) {
          item.favorite = true;
        }
      });
    });

    this.discounts.forEach((item) => {
      this.cartService.fav.forEach((fav) => {
        if (item.ITEM_CODE === fav.ITEM_CODE) {
          item.favorite = true;
        }
      });
    });
  }

  increase(item: Item, i) {
    this.cartService.cart.forEach((c) => {
      if (c.ITEM_CODE === item.ITEM_CODE)
        c.UNIT_QTY++, (item.UNIT_QTY = c.UNIT_QTY);
    });
  }

  decrease(item, i) {
    this.cartService.cart.forEach((c) => {
      if (c.ITEM_CODE === item.ITEM_CODE)
        c.UNIT_QTY--, (item.UNIT_QTY = c.UNIT_QTY);
    });
  }

  toggleFav(item: Item) {
    this.cartService.toggleFav(item).then((_) => {
      console.log('item', item);
    });
  }

  addToCart(item) {
    this.cartService.addToCart(item);
    item.addedToCart = true;
    this.helper.showToast('تم اضافة العنصر الي سلة المشتريات');
  }
}
