import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from '../../services/helper.service';
import { DataService } from '../../services/data.service';
import { Item } from '../../interfaces/item';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  numView: number = 0;
  category;
  items: Item[] = [];
  type;
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private helper: HelperService,
    private dataService: DataService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const fromHome = this.route.snapshot.paramMap.get('fromHome') === 'true';

    console.log(fromHome);

    if (fromHome) {
      const type = this.dataService.getParams().type;
      this.type = type;
      this.getItems(type);
    } else {
      this.category = this.dataService.getParams().category;
      this.getItems('cat');
    }
  }

  getItems(type?: any) {
    let url;
    if (type === 'feat') {
      url = '/api/item/get-feature';
    } else if (type === 'disc') {
      url = '/api/item/get-discount';
    } else if (type === 'cat') {
      url =
        '/api/item/search-by-category?category_id=' +
        this.category.CATEGORY_CODE;
    }
    this.helper.showLoading();
    this.api.getOtherData(url).subscribe(
      async (res: any) => {
        this.items.push(...res.data);
        await this.checkFav();
        await this.checkCart();
        console.log('items', this.items);
        this.helper.dismissLoading();
      },
      (err) => {
        console.log('err', err);
        this.helper.dismissLoading();
      }
    );
  }

  changeView() {
    if (this.numView === 0) {
      this.numView = 1;
    } else if (this.numView === 1) {
      this.numView = 0;
    }
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

  async checkCart() {
    this.items.forEach((item) => {
      this.cartService.cart.forEach((ca) => {
        if (item.ITEM_CODE === ca.ITEM_CODE) {
          item.addedToCart = true;
          item.UNIT_QTY = ca.UNIT_QTY;
        }
      });
    });
  }

  async checkFav() {
    this.items.forEach((item) => {
      this.cartService.fav.forEach((fav) => {
        if (item.ITEM_CODE === fav.ITEM_CODE) {
          item.favorite = true;
        }
      });
    });
  }

  increase(item: Item, i) {
    this.cartService.cart.forEach((c) => {
      if (c.ITEM_CODE === item.ITEM_CODE) {
        c.UNIT_QTY++, (item.UNIT_QTY = c.UNIT_QTY);
      }
    });
  }

  decrease(item, i) {
    this.cartService.cart.forEach((c) => {
      if (c.ITEM_CODE === item.ITEM_CODE) {
        c.UNIT_QTY--, (item.UNIT_QTY = c.UNIT_QTY);
      }
    });
  }

  // async getSaved() {
  //   await this.cartService.reloadAll();
  //   this.cart = this.cartService.cars;
  // }

  // removeFromSaved(index: number) {
  //   this.savedService.removeFromSaved(index);
  // }

  toggleFav(item: Item) {
    this.cartService.toggleFav(item).then((_) => {
      console.log('item', item);
    });
  }

  addToCart(item) {
    this.cartService.addToCart(item);
    item.addedToCart = true;
    this.helper.showToast('???? ?????????? ???????????? ?????? ?????? ??????????????????');
  }
}
