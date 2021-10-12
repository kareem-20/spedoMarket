import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { Item } from '../../interfaces/item';
import { DataService } from '../../services/data.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  fav: Item[] = []
  emptyView: boolean = false;
  constructor(
    private navCtrl: NavController,
    private cartService: CartService,
    private dataService: DataService,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.helper.showLoading();
    this.cartService.reloadAll().then(_ => {
      this.fav = this.cartService.getfav;
      console.log('this.fav', this.fav)
      if (this.fav.length == 0) this.emptyView = true;
    });
    this.helper.dismissLoading();
  }

  back() {
    this.navCtrl.back();
  }

  detail(item) {
    this.dataService.setParams({ item });
    this.navCtrl.navigateForward('/product-detail');
  }

  checkFav() {
    this.fav.forEach(item => {
      this.cartService.fav.forEach(fav => {
        if (item.ITEM_CODE === fav.ITEM_CODE) {
          item.favorite = true;
        }
      });
    });
  }
}
