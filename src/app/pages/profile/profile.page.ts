import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  photo = '../../../assets/photo_2021-06-08_13-53-51.jpg';

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

  addPhoto() {

  }

  changePass() {
    this.navCtrl.navigateForward('/password-change')
  }


}
