import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map', { static: true }) mapRef: ElementRef;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.initMap();
  }

  back() {
    this.navCtrl.back();
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
      let location = {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
      }

      console.log(location)
    })
  }

}
