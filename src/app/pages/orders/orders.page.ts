import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  segmentVal: number = 0;
  @ViewChild('slid') slid: IonSlides;

  slideOpts = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 0,
    slidesPerView: 1,
    freeMode: false,
    loop: false
  };
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  toCart() {

  }

  async segmentChanged(ev?: any) {
    // console.log('', ev)
    await this.slid.slideTo(ev.detail.value)
  }

  async slideChanged(ev?: any) {
    this.segmentVal = await this.slid.getActiveIndex()
  }

}
