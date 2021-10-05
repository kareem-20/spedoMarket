import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage-angular';
import { take } from 'rxjs/operators';
import { from } from 'rxjs';
import { NavController, Platform } from '@ionic/angular';



const USER_DATA = 'userData'
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userData = null;
  accessToken;
  refreshToken;

  constructor(
    private api: ApiService,
    private storage: Storage,
    private navCtrl: NavController,
    private platform: Platform,
  ) {
    this.storage.create();
    this.getCreadintial();
  }

  async reloadUserData() {
    const userData = await this.storage.get(USER_DATA);
    this.userData = userData == null ? null : userData;
  }

  async saveCreadintial(res: { accessToken: string; user: any; refreshToken: string; }) {
    localStorage.setItem(ACCESS_TOKEN, res.accessToken);
    this.userData = await this.storage.set(USER_DATA, res.user)
    this.accessToken = await this.storage.set(ACCESS_TOKEN, res.accessToken)
    this.refreshToken = await this.storage.set(REFRESH_TOKEN, res.refreshToken)
  }

  async getCreadintial() {
    const userData = await this.storage.get(USER_DATA);
    this.userData = userData == null ? null : userData;

    const accessToken = await this.storage.get(ACCESS_TOKEN);
    this.accessToken = accessToken == null ? null : accessToken;

    const refreshToken = await this.storage.get(REFRESH_TOKEN);
    this.refreshToken = refreshToken == null ? null : refreshToken;

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
      this.navCtrl.navigateBack('/tabs/home');
    });
  }

  // async unsubscriptionTopic() {
  //     if (this.platform.is('cordova')) {
  //         return await this.fcm.unsubscribeFromTopic(`status-${this.userData._id}`)
  //     }
  // }
}
