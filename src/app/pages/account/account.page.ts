import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DrawerState } from 'ion-bottom-drawer';
import { SheetState } from 'ion-bottom-sheet';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  sheetState = SheetState.Bottom;
  title = 'my title';

  drawerState = DrawerState.Bottom;
  minimumHeight = '200px';

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  toCart() {
    this.navCtrl.navigateForward('/cart')
  }



  toAddress() {
    this.navCtrl.navigateForward('/address')
  }

  toFav() {

  }

  profile() {
    this.navCtrl.navigateForward('/profile')
  }

  openSheet() {
    this.sheetState = SheetState.Docked;
    this.drawerState = DrawerState.Docked
  }

  contact() {
    this.navCtrl.navigateForward('/contact')
  }

}
