import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { MapPage } from '../map/map.page';
import { Address } from '../../interfaces/address';
import { HelperService } from '../../services/helper.service';

declare var google: any;

@Component({
  selector: 'app-address-config',
  templateUrl: './address-config.page.html',
  styleUrls: ['./address-config.page.scss'],
})
export class AddressConfigPage implements OnInit {

  address: Address;

  currentLocation: { lat: number, lng: number };
  title: string;
  zone: string;
  street: string;
  mark: string;
  userId;
  @ViewChild('smallMap', { static: true }) smallMap: ElementRef
  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
    private api: ApiService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private helper: HelperService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userId = this.authService.userData?._id
    this.address = this.dataService.getParams()?.address
    if (this.address) this.patchData();
  }

  patchData() {
    this.title = this.address.title;
    this.mark = this.address.mark;
    this.zone = this.address.zone;
    this.street = this.address.street;
    this.currentLocation = this.address.position;

    this.initMap();
  }

  initMap() {
    let latLng = new google.maps.LatLng(this.currentLocation);
    let options = {
      center: latLng,
      zoom: 10
    }
    let map = new google.maps.Map(this.smallMap.nativeElement, options);
    this.addMarker(map, latLng)
  }

  addMarker(map: any, position: any) {
    const markImage = '../../../assets/Icon&Svg/8.my location/svg/pin_big.svg';
    let marker = new google.maps.Marker({
      map,
      position,
      icon: markImage
    })
  }

  back() {
    this.navCtrl.back();
  }

  async toMap() {
    const modal = await this.modalCtrl.create({
      component: MapPage,
      animated: true
    })
    modal.present();
    let data = await modal.onDidDismiss();
    if (data.data) {
      if (data.data) this.initMap()
      console.log('data of modal', data.data)
    } else {
      this.helper.showToast('فشل تحديد الموقع يرجي المحاولة مرة اخري')
    }
  }


  addAddress() {
    this.helper.showLoading();

    let body = {
      title: this.title,
      zone: this.zone,
      street: this.street,
      position: this.currentLocation,
      mark: this.mark,
      userId: this.userId
    }

    console.log('address', body)
    if (this.address) { // edit address

      this.api.updateData(`/address/update/${this.address._id}`, body)
        .subscribe((res) => {
          this.done();
        }, (err) => {
          console.log('err', err)
        })
    } else { // add new address

      this.api.postData('/address/add', body).subscribe((res) => {
        this.done();
      }, (err) => {
        console.log('err', err)
      })
    }
  }

  done() {
    this.navCtrl.navigateBack('/address').then(_ => {
      this.dataService.setParams({})
      this.helper.dismissLoading()
    })
  }


}
