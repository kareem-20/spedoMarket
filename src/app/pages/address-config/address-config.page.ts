import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-address-config',
  templateUrl: './address-config.page.html',
  styleUrls: ['./address-config.page.scss'],
})
export class AddressConfigPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back();
  }

  toMap() {
    this.navCtrl.navigateForward('/map')
  }


}
