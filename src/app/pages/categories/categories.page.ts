import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  numView: number = 0;
  errorView: boolean;
  categories: Category[] = [];
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private helper: HelperService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getCategory();
  }

  toCart() {}

  getCategory() {
    this.helper.showLoading();
    this.api.getOtherData('/api/category/get').subscribe(
      (res: any) => {
        console.log('res', res);
        this.categories.push(...res.data);
        this.helper.dismissLoading();
      },
      (err) => {
        console.log('err', err);
        this.helper.dismissLoading();
      }
    );
  }

  changeView() {
    if (this.numView == 0) this.numView = 1;
    else if (this.numView == 1) this.numView = 0;
  }

  items_by_category(category) {
    this.dataService.setParams({ category });
    this.navCtrl.navigateForward('/products/' + false);
  }
}
