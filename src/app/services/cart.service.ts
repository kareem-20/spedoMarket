import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Item } from '../interfaces/item';
import { HelperService } from './helper.service';
import { BehaviorSubject } from 'rxjs';

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

  constructor(
    private storage: Storage,
    private helper: HelperService
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
    console.log('this.cart', this.cart);
    console.log('this count', this.cartCount)
    return this.storage.set(CART, this.cart)
    // this.helper.dismissLoading();
    // }
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
    this.helper.showLoading();
    this.cart.splice(index, 1);
    await this.storage.set(CART, this.cart);
    this.helper.dismissLoading();
  }

}
