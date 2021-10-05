import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, ModalController, NavController, ToastController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as codes from 'country-codes-list';
import { parsePhoneNumber } from 'libphonenumber-js';
import { OtpPage } from '../otp/otp.page';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import {
  SignInWithApple,
  ASAuthorizationAppleIDRequest,
  AppleSignInResponse,
  AppleSignInErrorResponse
} from "@ionic-native/sign-in-with-apple/ngx";


@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {

  segmentVal: number = 0;
  showPass: boolean = false;
  @ViewChild('mySlider') slid: IonSlides;

  loginForm: FormGroup;
  signForm: FormGroup;
  counrtyCodesPhone = codes.all();
  myCountryCode;

  slideOpts = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 0,
    slidesPerView: 1,
    freeMode: false,
    loop: false
  };



  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private googlePlus: GooglePlus,
    private modalCtrl: ModalController,
    private api: ApiService,
    private authService: AuthService,
    private helper: HelperService,
    private dataService: DataService,
    private signInWithApple: SignInWithApple
  ) {
    this.createForms();
  }

  ngOnInit() {
    console.log('contry code', codes.all())
  }

  createForms() {
    // login form
    this.loginForm = this.fb.group({
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });

    // sign from
    this.signForm = this.fb.group({
      phone: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
    })
  }

  changeCountry(ev?: any) {
    this.myCountryCode = ev.detail.value;
  }

  show() {
    this.showPass = !this.showPass;
  }

  async segmentChanged(ev?: any) {
    await this.slid.slideTo(+this.segmentVal)
  }

  async slideChanged(ev) {
    this.segmentVal = await this.slid.getActiveIndex()
  }

  skip() {
    this.navCtrl.navigateForward('/tabs/home')
  }

  validatePhoneNumber(phoneNumber) {
    return parsePhoneNumber(phoneNumber, this.myCountryCode || 'IQ');
  }

  login() {
    let phone = this.validatePhoneNumber(this.loginForm.value.phone);
    let body = {
      phone: this.loginForm.value.phone,
      password: this.loginForm.value.password
    }
    if (phone.isValid()) {
      console.log('body', body)
      this.api.postData(
        '/auth/login', body
      ).subscribe((res: any) => {
        console.log('res', res)
        this.authService.saveCreadintial(res);
        this.navCtrl.navigateForward('/tabs/home')
      })
    }
  }

  async otp() {
    const phone = this.validatePhoneNumber(this.signForm.value.phone);
    if (phone.isValid()) {
      if (this.signForm.value.password === this.signForm.value.rePassword) {
        this.dataService.setParams({ phone: this.signForm.value.phone })
        // this.api.getData(`/auth/isValid/${this.signForm.value.phone}`).subscribe(async (res: any) => {
        // if (res.valid) {
        const modal = await this.modalCtrl.create({
          component: OtpPage
        });
        await modal.present();
        let data = await modal.onDidDismiss();
        if (data.data) {
          this.sign();
          this.helper.showToast('تم التأكيد بنجاح')
        } else {
          this.helper.showToast('فشل تأكيد الكود')
        }
        // } else {
        this.helper.showToast('هذا الرقم مستخدم من قبل')
        // }
        // });
      }
    }
  }

  sign() {
    this.api.postData(
      '/auth/register',
      {
        phone: this.signForm.value.phone,
        password: this.signForm.value.password
      }).subscribe((res: any) => {
        console.log('res', res);
        this.authService.saveCreadintial(res)
        this.navCtrl.navigateForward('tabs/home')
      })
  }

  googleSing() {
    this.googlePlus.login({}).then(res => {
      // alert('res' + JSON.stringify(res))
      console.log('res', res)
    })
      .catch(err => alert('err' + err))
  }

  AppleSignIn() {
    this.signInWithApple
      .signin({
        requestedScopes: [
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
        ]
      })
      .then((res: AppleSignInResponse) => {
        alert("Apple login success:- " + res);
      })
      .catch((error: AppleSignInErrorResponse) => {
        alert(error);
      });

  }

  // Wrap every letter in a span


}
