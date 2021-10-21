import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Order } from 'src/app/interfaces/order';

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
    loop: false,
  };

  pastOrders: Order[] = [];
  newOrders: Order[] = [];

  newEmpty: boolean;
  pastEmpty: boolean;

  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private helper: HelperService,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  async getOrders() {
    this.helper.showLoading();
    this.api
      .getData('/api/order/get/' + this.authService.userData._id)
      .subscribe((res: any[]) => {
        console.log('res', res);
        res.forEach((order) => {
          if (order.status == 'pending') this.newOrders.push(order);
          else this.pastOrders.push(order);
        });
        this.newEmpty = this.newOrders.length ? false : true;
        this.pastEmpty = this.pastOrders.length ? false : true;

        this.helper.dismissLoading();
      });
  }

  toCart() {}

  async segmentChanged(ev?: any) {
    // console.log('', ev)
    await this.slid.slideTo(ev.detail.value);
  }

  async slideChanged(ev?: any) {
    this.segmentVal = await this.slid.getActiveIndex();
  }

  info(order) {
    this.dataService.setParams({ order });
    this.navCtrl.navigateForward('/order-info');
  }
}
