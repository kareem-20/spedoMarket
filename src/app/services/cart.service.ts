import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Item } from '../interfaces/item';
import { HelperService } from './helper.service';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../interfaces/order';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { NavController } from '@ionic/angular';
import { DataService } from './data.service';

const CART = 'cart';
const FAV = 'fav';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: Item[] = [];
  public fav: Item[] = [];
  public order: any;
  totalCash: number;
  reloaded: boolean = false;
  cartCount = new BehaviorSubject(0);
  paymentMethod: string;
  note: string;

  constructor(
    private storage: Storage,
    private helper: HelperService,
    private authService: AuthService,
    private api: ApiService,
    private navCtrl: NavController,
    private dataService: DataService
  ) {
    this.reloadAll()
  }

  async reloadAll() {
    const cart = await this.storage.get(CART);
    cart == null ? (this.cart = []) : (this.cart = cart);

    const fav = await this.storage.get(FAV);
    fav == null ? (this.fav = []) : (this.fav = fav);

    this.reloaded = true;
  }


  toggleFav(item: Item) {
    let added = false;
    for (const [index, p] of this.fav.entries()) {
      if (p.ITEM_CODE === item.ITEM_CODE) {
        added = true;
        this.fav.splice(index, 1);
        item.favorite = false;
      }
    }
    if (!added) {
      this.fav.push(item);
      item.favorite = true;
    }
    return this.storage.set(FAV, this.fav);
  }


  async addToCart(item: Item) {
    let added = false;
    if (!item.UNIT_QTY) {
      item.UNIT_QTY = 1;
    }
    for (const p of this.cart) {
      if (p.ITEM_CODE === item.ITEM_CODE) {
        added = true;
        p.UNIT_QTY += 1;
        break;
      }
    }
    if (!added) {
      this.cart.push(item);
    }
    this.cartCount.next(this.cartCount.value + 1);
    return this.storage.set(CART, this.cart)

  }

  increase(i) {
    this.cart[i].UNIT_QTY += 1;;
    this.saveCart()
  }

  decrease(i) {
    this.cart[i].UNIT_QTY -= 1;
    this.saveCart()
  }

  remove(i) {
    this.cart.splice(i, 1)
    this.cartCount.next(this.cartCount.value - 1)
    this.saveCart()
  }

  saveCart() {
    return this.storage.set(CART, this.cart)
  }

  async removeFromCart(index) {
    // this.helper.showLoading();
    this.cart.splice(index, 1);
    await this.storage.set(CART, this.cart);
    // this.helper.dismissLoading();
  }

  confirmOrder() {
    let orderDetail = [];
    this.cart.forEach(pro => {
      let o = {
        item_code: pro.ITEM_CODE,
        item_qty: pro.UNIT_QTY
      }
      orderDetail.push(o)
    })
    let order: Order = {
      userId: this.authService.userData._id,
      address: this.authService.myAddress._id,
      date: Date.now(),
      orderDetail: orderDetail,
      paymentMethod: this.paymentMethod,
      totalCash: this.totalCash,
      note: this.note
    };

    console.log('order', order);

    this.api.postData('/api/order/add', order)
      .subscribe((res: any) => {
        console.log('res', res);
        if (res) {
          this.dataService.setParams({ lastOrder: order ,orderAddress:this.authService.myAddress})
          this.navCtrl.navigateForward('/order-done');
          this.emptyCart()
        }
      }, (err) => {
        console.log('err', err);
        this.navCtrl.navigateForward('/order-error')
      })
  }

  emptyCart() {
    this.cart = [];
    this.cartCount.next(0);
    this.storage.remove(CART);
  }

}
