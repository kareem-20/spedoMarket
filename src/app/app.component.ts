import { Component } from '@angular/core';
import { HelperService } from './services/helper.service';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loading = false;

  constructor(
    private helper: HelperService,
    private platform: Platform,
    private storage: Storage
  ) {
    this.storage.create();
    this.initApp()
  }

  initApp() {
    this.platform.ready()
      .then(_ => {
        this.watchLoading();
      })
  }

  watchLoading() {
    this.helper.watchLoading()
      .subscribe(loading => {
        this.loading = loading
      });
  }
}
