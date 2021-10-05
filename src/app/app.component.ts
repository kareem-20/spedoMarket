import { Component } from '@angular/core';
import { HelperService } from './services/helper.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loading = false;

  constructor(
    private helper: HelperService,
    private platform: Platform
  ) {
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
