import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, NavController, ToastController } from '@ionic/angular';

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
    private navCtrl: NavController
  ) {
    this.createForms();
  }

  ngOnInit() {
  }

  createForms() {
    // login form
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', Validators.required]
    });

    // sign from
    this.signForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
    })
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


  login() {

  }

  sign() {

  }

  google() {

  }

  facebook() {

  }
}
