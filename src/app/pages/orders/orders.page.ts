import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

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
    private navCtrl: NavController,
    private api: ApiService,
    private helper: HelperService,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.api.getData('/api/order/get/' + this.authService.userData._id).subscribe(res => {
      console.log('res', res)
    })
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
