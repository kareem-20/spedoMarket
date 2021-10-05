import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private navParams: any;
  myLocation;

  constructor() { }

  setParams(body) {
    this.navParams = body
  }

  getParams() {
    return this.navParams;
  }

}
