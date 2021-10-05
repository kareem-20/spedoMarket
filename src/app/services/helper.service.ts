import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  loading = new BehaviorSubject(false);

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    })
    await toast.present()
  }

  showLoading() {
    this.loading.next(true);
  }

  dismissLoading() {
    this.loading.next(false)
  }

  watchLoading() {
    return this.loading.asObservable();
  }


}
