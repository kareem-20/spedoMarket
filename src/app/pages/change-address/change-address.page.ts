import { Component, OnInit } from '@angular/core';
import { Address } from '../../interfaces/address';
import { Subscription } from 'rxjs';
import { Events } from 'src/app/interfaces/events';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.page.html',
  styleUrls: ['./change-address.page.scss'],
})
export class ChangeAddressPage implements OnInit {

  address: Address[] = [];
  myAddress: Address;
  emptyView: boolean = false;
  userId: string;
  otherAddress = [];
  eventSubscription: Subscription;

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private helper: HelperService,
  ) {

  }

  ngOnInit() {
    this.userId = this.authService.userData?._id;
    this.getAddress();

    this.eventSubscription = this.helper.onChangeEvent()
      .subscribe(eventName => {
        if (eventName == Events.refreshAddress) {
          this.getAddress()
        }
      })
  }

  getAddress() {
    this.helper.showLoading()
    this.otherAddress = [];
    this.address = [];

    this.myAddress = this.authService.myAddress;

    this.api.getData('/api/address/get/' + this.userId).subscribe((res: any[]) => {
      if (res.length) {
        this.address = res;
        if (res.length === 1) {
          this.authService.setmyAddress(res[0]);
          this.myAddress = res[0];
          console.log('first if')

        } else {
          console.log('first else')
          if (this.myAddress) {
            console.log('second if')

            this.address.forEach(ade => {
              if (ade._id === this.myAddress?._id) {
                ade.checked = true
              } else {
                ade.checked = false;
                this.otherAddress.push(ade)
              }
            });
          } else {
            console.log('second else')

            this.otherAddress = res;

          }
        }

      } else {
        this.emptyView = true;
      }
      this.helper.dismissLoading()
    }, (err) => {
      console.log('err', err)
    })
  }
}
