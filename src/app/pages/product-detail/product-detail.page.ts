import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Item } from 'src/app/interfaces/item';
import { DataService } from '../../services/data.service';
import { HelperService } from '../../services/helper.service';
import { CartService } from '../../services/cart.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  myItem: Item;

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 5,
    slidesPerView: 1,
    freeMode: false,
    loop: true,
  };
  semilarProducts = [];
  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
    private helper: HelperService,
    private cartService: CartService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.helper.showLoading();
    this.myItem = this.dataService.getParams().item;
    this.getSemilars();
  }

  getSemilars() {
    this.api
      .getOtherData(
        '/api/item/search-by-category?category_id=' + this.myItem.CATEGORY_CODE
      )
      .subscribe(
        async (res: any) => {
          for (let i = 0; i < 5; i++) {
            if (this.myItem.ITEM_CODE !== res.data[i].ITEM_CODE) {
              this.semilarProducts.push(res.data[i]);
            }
          }
          await this.checkFav();
          await this.checkCart();
          this.helper.dismissLoading();
        },
        (err) => {
          console.log('err', err);
          this.helper.dismissLoading();
        }
      );
  }

  async checkCart() {
    this.semilarProducts.forEach((item) => {
      this.cartService.cart.forEach((ca) => {
        if (item.ITEM_CODE === ca.ITEM_CODE) {
          item.addedToCart = true;
          item.UNIT_QTY = ca.UNIT_QTY;
        }
      });
    });
  }

  async checkFav() {
    this.semilarProducts.forEach((item) => {
      this.cartService.fav.forEach((fav) => {
        if (item.ITEM_CODE === fav.ITEM_CODE) {
          item.favorite = true;
        }
      });
    });
  }

  back() {
    this.navCtrl.back();
  }

  toCart() {
    this.navCtrl.navigateForward('/cart');
  }

  detail(item) {
    this.dataService.setParams({ item });
    this.navCtrl.navigateForward('/product-detail');
  }

  toggleFav(item: Item) {
    this.cartService.toggleFav(item).then((_) => {
      console.log('item', item);
    });
  }
  increase(item: Item) {
    if (item.addedToCart) {
      this.cartService.cart.forEach((c) => {
        if (c.ITEM_CODE === item.ITEM_CODE)
          c.UNIT_QTY++, (item.UNIT_QTY = c.UNIT_QTY);
      });
    } else {
      item.UNIT_QTY++;
    }
  }

  decrease(item) {
    if (item.addedToCart) {
      this.cartService.cart.forEach((c) => {
        if (c.ITEM_CODE === item.ITEM_CODE)
          c.UNIT_QTY--, (item.UNIT_QTY = c.UNIT_QTY);
      });
    } else {
      item.UNIT_QTY--;
    }
  }

  addToCart(item) {
    if (!item.addedToCart) {
      this.cartService.addToCart(item);
      item.addedToCart = true;
    }
  }
}
