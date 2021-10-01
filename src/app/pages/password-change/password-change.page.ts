import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  back() {
    this.navCtrl.back()
  }

  toCart() {
    this.navCtrl.navigateForward('/cart')
  }

  done() {
    this.navCtrl.navigateForward('/password-done')
  }
}
