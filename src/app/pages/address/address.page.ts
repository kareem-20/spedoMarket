import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  emptyView: boolean = false;
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back();
  }

  addAddress() {
    this.navCtrl.navigateForward('/address-config')
  }

  async deleteAddress() {
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

}
