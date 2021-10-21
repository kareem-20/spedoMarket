import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild('tabs') tabs: IonTabs;
  selectedTab: string = 'home';
  isUser: boolean;
  constructor(private auth: AuthService) {
    this.auth.getCredentials();
  }

  ngOnInit() {
    this.auth.reloadUserData().then((_) => {
      this.isUser = this.auth.userData ? true : false;
      console.log(this.auth.userData);
      console.log(this.isUser);
    });
  }

  change(ev?: any) {
    this.selectedTab = ev.tab;
  }
}
