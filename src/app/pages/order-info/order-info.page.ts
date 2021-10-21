import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Order } from '../../interfaces/order';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.page.html',
  styleUrls: ['./order-info.page.scss'],
})
export class OrderInfoPage implements OnInit, OnDestroy {
  order: Order;
  orderDetails: Item[] = [];
  orderAddress;
  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
    private api: ApiService,
    private helper: HelperService
  ) {}

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.helper.showLoading();
    this.order =
      this.dataService.getParams()?.lastOrder ||
      this.dataService.getParams()?.order;
    let fork = [];
    this.orderAddress =
      this.dataService.getParams().orderAddress || this.order.address;
    this.order.orderDetail.forEach((pro) => {
      fork.push(this.api.getOtherData(`/api/item/get?id=${pro.item_code}`));
    });
    forkJoin(fork).subscribe((res) => {
      console.log('res from fork join', res);

      res.forEach((product: any) => {
        this.orderDetails.push(product.data);
      });
      this.helper.dismissLoading();
    });
  }

  back() {
    this.navCtrl.navigateBack('/tabs/orders');
  }

  ngOnDestroy() {
    this.dataService.setParams({});
  }
}
