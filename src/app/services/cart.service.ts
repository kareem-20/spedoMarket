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

  cart: Item[] = [];
  fav: Item[] = [];

  reloaded: boolean = false;
  cartCount = new BehaviorSubject(0);

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

  get getfav() {
    return this.fav
  }

  async addToCart(item: Item) {
    if (!this.reloaded) await this.reloadAll();
    this.helper.showLoading();

    const filter = this.cart.filter((c) => {
      return c?.ITEM_CODE == item.ITEM_CODE;
    });

    if (filter.length) {
      this.helper.dismissLoading();
      this.helper.showToast('تم ازالة المنتج ');
    } else {
      this.cart.push(item);
      await this.storage.set(CART, this.cart);
      this.helper.showToast('تم حفظ المتج');
      this.helper.dismissLoading();
    }
  }

  async removeFromCart(index) {
    this.helper.showLoading();
    this.cart.splice(index, 1);
    await this.storage.set(CART, this.cart);
    this.helper.dismissLoading();
  }

}
