import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DrawerState } from 'ion-bottom-drawer';
import { SheetState } from 'ion-bottom-sheet';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  sheetState = SheetState.Bottom;
  title = 'my title';

  user: User;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.authService.getCredentials().then(_ => {

      this.user = this.authService.userData;
      console.log('this.user', this.user);
      console.log('auth UserData', this.authService.userData);
    });
  }

  toCart() {
    this.navCtrl.navigateForward('/cart')
  }



  toAddress() {
    if (this.user) {
      this.navCtrl.navigateForward('/address')
    } else {
      this.navCtrl.navigateRoot('/sign')
      this.helper.showToast('سجل دخول اولاً')
    }
  }

  toFav() {

  }

  profile() {
    if (this.user) {
      this.navCtrl.navigateForward('/profile')
    } else {
      this.navCtrl.navigateRoot('/sign')
      this.helper.showToast('سجل دخول اولاً')
    }
  }

  openSheet() {
    this.sheetState = SheetState.Top;
    // this.drawerState = DrawerState.Docked
  }

  contact() {
    this.navCtrl.navigateForward('/contact')
  }



}
