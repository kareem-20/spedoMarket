import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-password-done',
  templateUrl: './password-done.page.html',
  styleUrls: ['./password-done.page.scss'],
})
export class PasswordDonePage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  toAccount() {
    this.navCtrl.navigateBack('/profile')
  }
  toHome() {
    this.navCtrl.navigateRoot('/tabs/home')
  }

}
