import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  numView: number = 0;

  constructor() { }

  ngOnInit() {
  }

  toCart() {

  }
  changeView() {
    if (this.numView == 0) this.numView = 1
    else if (this.numView == 1) this.numView = 0;
  }

}
