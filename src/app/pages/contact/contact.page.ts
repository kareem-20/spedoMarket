import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(
    private navCtrl: NavController

  ) { }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back();
  }
  
  toCart() {
    this.navCtrl.navigateForward('/cart')
  }

}
