import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-done',
  templateUrl: './order-done.page.html',
  styleUrls: ['./order-done.page.scss'],
})
export class OrderDonePage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  toHome() {
    this.navCtrl.navigateRoot('/tabs/home')
  }

}
