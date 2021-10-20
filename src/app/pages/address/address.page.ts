import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Events } from 'src/app/interfaces/events';
import { Address } from '../../interfaces/address';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit ,OnDestroy{

  address: Address[] = [];
  myAddress: Address;
  emptyView: boolean = false;
  userId: string;
  otherAddress = [];
  eventSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private api: ApiService,
    private authService: AuthService,
    private helper: HelperService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.userId = this.authService.userData?._id;
    this.getAddress();

    // this.eventSubscription = this.helper.onChangeEvent()
    //   .subscribe(eventName => {
    //     if (eventName == Events.refreshAddress) {
    //       this.getAddress()
    //     }
    //   })
  }

  back() {
    if(this.eventSubscription) this.eventSubscription.unsubscribe();
    this.navCtrl.navigateBack('/tabs/account');
  }

  addAddress() {
    this.navCtrl.navigateForward('/address-config')
  }

  ionViewWillEnter() {
    // this.getAddress()
  }
  getAddress() {
    this.helper.showLoading()
    this.otherAddress = [];
    this.address = [];

    this.myAddress = this.authService.myAddress;

    this.api.getData('/api/address/get/' + this.userId).subscribe((res: any[]) => {
      if (res.length) {
        this.address = res;
        if (res.length === 1) {
          this.authService.setmyAddress(res[0]);
          this.myAddress = res[0];
          console.log('first if')

        } else {
          console.log('first else')
          if (this.myAddress) {
            console.log('second if')

            this.address.forEach(ade => {
              if (ade._id === this.myAddress?._id) {
                ade.checked = true
              } else {
                ade.checked = false;
                this.otherAddress.push(ade)
              }
            });
          } else {
            console.log('second else')

            this.otherAddress = res;

          }
        }

      } else {
        this.emptyView = true;
      }
      this.helper.dismissLoading()
    }, (err) => {
      console.log('err', err)
    })
  }

  change(ev?: any) {
    console.log('ev', ev.detail)
    // this.helper.showLoading();
    this.authService.myAddress = ev.detail.value;
    this.getAddress();
    // this.helper.dismissLoading()
  }

  async deleteAddress(ad: Address, i?: number) {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: ''
      ,
      message: `
        <div class="myalert12">
            <div class="image" >
              <img src="../../../assets/Icon&Svg/8.my location/svg/delet_big.svg" alt="">
            </div>
            <h2>هل أنت متأكد من حذف هذا العنوان</h2>
        </div>`,
      cssClass: 'default-alert',
      buttons: [
        {
          text: 'حذف',
          handler: () => {
            this.otherAddress.splice(i, 1);
            console.log('ad', ad)
            this.api.deleteData('/api/address/delete/' + ad._id).subscribe((res) => {
              console.log('res of delete', res)
            })
          },
          cssClass: 'primary'
        },
        {
          text: "الغاء",
          role: 'cancel'
        }
      ]
    })
    alert.present()

  }

  edit(address) {
    this.dataService.setParams({ address });
    this.navCtrl.navigateForward('/address-config')
  }
  ngOnDestroy(){
   if(this.eventSubscription) this.eventSubscription.unsubscribe();
  }
}
