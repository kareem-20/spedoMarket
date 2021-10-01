import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  emptyView: boolean = true;
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back();
  }

}
