import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage-angular';
import { take } from 'rxjs/operators';
import { from } from 'rxjs';
import { NavController, Platform } from '@ionic/angular';
import { Address } from '../interfaces/address';
import { User } from '../interfaces/user';



const USER_DATA = 'userData'
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const MY_ADDRESS = 'my_address';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userData: User = null;
  accessToken;
  refreshToken;
  myAddress: Address;
  constructor(
    private api: ApiService,
    private storage: Storage,
    private navCtrl: NavController,
    private platform: Platform,
  ) {
    this.storage.create();
    this.getCredentials();
  }

  async reloadUserData() {
    const userData = await this.storage.get(USER_DATA);
    this.userData = userData == null ? null : userData;
  }

  async saveCreadintial(res: { accessToken: string; user: any; refreshToken: string; }) {
    localStorage.setItem(ACCESS_TOKEN, res.accessToken);
    this.userData = await this.storage.set(USER_DATA, res.user)
    this.accessToken = await this.storage.set(ACCESS_TOKEN, res.accessToken);
    this.refreshToken = await this.storage.set(REFRESH_TOKEN, res.refreshToken);
  }

  async getCredentials() {
    const userData = await this.storage.get(USER_DATA);
    this.userData = userData == null ? null : userData;

    const accessToken = await this.storage.get(ACCESS_TOKEN);
    this.accessToken = accessToken == null ? null : accessToken;

    const refreshToken = await this.storage.get(REFRESH_TOKEN);
    this.refreshToken = refreshToken == null ? null : refreshToken;

    const myAddress = await this.storage.get(MY_ADDRESS);
    this.myAddress = myAddress == null ? null : myAddress;

  }


  getNewAccess() {
    let promise = new Promise(async (resolve, reject) => {
      let refresh = await this.storage.get(REFRESH_TOKEN);
      return this.api.postData('/auth/refresh', refresh).pipe(take(1)).subscribe(async (res: any) => {
        localStorage.setItem(ACCESS_TOKEN, res.accessToken)
        this.storage.set(ACCESS_TOKEN, res.accessToken)
        this.storage.set(REFRESH_TOKEN, res.refreshToken)
        resolve(res.accessToken)
      },
        (e: any) => reject(e)
      )
    })
    return from(promise)
  }


  async updateUserData(user) {
    this.userData = await this.storage.set(USER_DATA, user);
  }

  async setmyAddress(myaddress) {
    this.myAddress = await this.storage.set(MY_ADDRESS, myaddress);
  }

  async clearCreadintial() {
    // await this.unsubscriptionTopic();

    localStorage.removeItem(ACCESS_TOKEN);
    await this.storage.remove(USER_DATA);
    this.userData = null;
    await this.storage.remove(ACCESS_TOKEN);
    this.accessToken = null
    await this.storage.remove(REFRESH_TOKEN);
    this.refreshToken = null;
  }

  async logOut() {
    return await this.clearCreadintial().then(() => {
      this.navCtrl.navigateBack('/sign');
    });
  }

  // async unsubscriptionTopic() {
  //     if (this.platform.is('cordova')) {
  //         return await this.fcm.unsubscribeFromTopic(`status-${this.userData._id}`)
  //     }
  // }
}
