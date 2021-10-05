import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HelperService } from '../../services/helper.service';
import { DataService } from '../../services/data.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map', { static: true }) mapRef: ElementRef;

  currentLocation: {
    lng: number,
    lat: number
  }
  mapLocation: {
    lng: number,
    lat: number
  }
  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private helper: HelperService,
    private dataService: DataService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.initMap();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  initMap() {
    let latLng = new google.maps.LatLng(30.5692757, 31.5045745);
    let options = {
      center: latLng,
      zoom: 15
    }

    let map = new google.maps.Map(this.mapRef.nativeElement, options);

    this.addMarker(map, latLng)
  }

  addMarker(map, position) {
    const markImage = '../../../assets/Icon&Svg/8.my location/svg/pin_big.svg';

    let marker = new google.maps.Marker({
      map,
      position,
      draggable: true,
      icon: markImage
    })

    marker.addListener('dragend', () => {
      this.mapLocation = {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
      }

      // console.log(location)
    })
  }

  async getMyLocation() {
    await this.geolocation.getCurrentPosition(
      {
        enableHighAccuracy: true,
        timeout: 4000
      }
    ).then((p) => {
      let currentLocation = {
        lng: p.coords.longitude,
        lat: p.coords.latitude
      }

      this.dataService.myLocation = this.currentLocation;
      this.modalCtrl.dismiss(currentLocation)
    }).catch(err => {
      this.helper.showToast('فشل تحديد الموقع من فضلك تأكد من ال gps')
    })
  }

  confirmLocation() {
    this.modalCtrl.dismiss(this.mapLocation)
  }

}
