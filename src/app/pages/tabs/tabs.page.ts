import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('tabs') tabs: IonTabs;
  selectedTab: string = 'home';

  constructor() {

  }

  change(ev?: any) {
    this.selectedTab = ev.tab;
  }
}
