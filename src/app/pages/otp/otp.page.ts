import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { HelperService } from '../../services/helper.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  loading;
  config = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: 'otp-input',
    placeholder: '#'
  }
  time: number = 90;
  code: number;
  interval: any;
  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService,
    private helper: HelperService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.sendOtp();
  }

  // otp input
  onOtpChange(ev) {
    console.log(ev);
    this.code = ev;
  }

  sendOtp() {
    const phone = this.dataService.getParams()?.phone.toString();
    console.log('phone', phone)
    this.api.postOtp(`/send`, { phone }).subscribe(
      (verifi: any) => {
        // otp send successfully
        if (verifi.verificationId) {
          localStorage.setItem('code', verifi.verificationId);
          console.log(verifi);
          this.clcTime();
          this.loading = false;
        } else {
          // handel err
          this.helper.showToast('خطأبالارسال يرجي المحاوله لاحقا');
          // this.dismiss(false);
        }
      },
      (err) => {
        console.log(err);
        this.helper.showToast('خطأبالارسال يرجي المحاوله لاحقا');
        // this.dismiss(false);
      }
    );
  }

  reSend() {
    const phone = this.dataService.getParams()?.phone;

    this.api.postOtp(`/resend`, phone).subscribe(
      (verifi: any) => {
        this.clcTime();
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendCode() {
    let ver = {
      code: this.code,
      verificationId: localStorage.getItem('code'),
    };
    this.api.postOtp('/verify', ver).subscribe(
      (res: any) => {
        if (res.verified) {
          localStorage.removeItem('code');
          localStorage.setItem('verified', 'true');
          this.helper.showToast('تم التاكيد بنجاح');
          this.dismiss(res.verified);
        } else {
          this.helper.showToast('الكود الذي ادخلته غير صحيح');
        }
      },
      (err) => {
        console.log(err);
        this.helper.showToast('خطأ بالسيرفر يرجي المحاوله لاحقا');
      }
    )
  }

  async dismiss(data: any) {
    await this.modalCtrl.dismiss(data);
  }

  clcTime() {
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time -= 1;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
