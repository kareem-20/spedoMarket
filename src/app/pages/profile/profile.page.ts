import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';

var fileReader = new FileReader();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  //  user data
  user: User = this.authService.userData


  // photo data
  @ViewChild('image') img: ElementRef;
  resultUpload: string;
  uploadFile;
  imageURL: string | ArrayBuffer;

  // photo options
  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
  };
  libraryOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
  };

  //form data;
  // phone:number;
  url = this.api.BaseUrl+'/';

  pornDate
  constructor(
    private navCtrl: NavController,
    private actionSheet: ActionSheetController,
    private camera: Camera,
    private file: File,
    private fileTransfer: FileTransfer,
    private api: ApiService,
    private authService: AuthService,
    private helper: HelperService
  ) { }


  ngOnInit() {
    console.log('this.user', this.user)
    if (this.user) this.imageURL = this.user.image
  }

  back() {
    this.navCtrl.back()
  }

  toCart() {
    this.navCtrl.navigateForward('/cart')
  }

  async addPhoto() {
    const actionSheet = await this.actionSheet.create({
      header: 'Select Option',
      buttons: [
        {
          text: '???????????? ????????',
          icon: 'camera',
          handler: () => {
            // from camera
            this.camera
              .getPicture(this.cameraOptions)
              .then(async (res: string) => {
                let name = res.slice(res.lastIndexOf('/') + 1);
                let dir = res.replace(name, '');
                this.uploadWithFileTrans(res);
                this.file.readAsDataURL(dir, name).then(
                  (success) => {
                    this.imageURL = success;
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              })
              .catch((err) => console.log(err));
          }
        },
        {
          text: "?????????? ???? ????????????",
          icon: 'image',
          handler: () => {
            //  from library
            (this.img.nativeElement as HTMLInputElement).click();

          }
        }
        ,
        {
          text: "??????????",
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async uploadWithFileTrans(img: string) {
    let upload = this.fileTransfer.create()
    upload.upload(img, 'http://localhost:3000/api/upload/image', { fileKey: 'image' }).then(res => {
      let src = res.response
      this.resultUpload = src.slice(src.indexOf("") + 1, src.lastIndexOf('/\/'))
    });

  }

  showImage(event: any) {
    let file = event.target.files[0];
    this.uploadFile = file
    if (event.target.files[0].size < 1000000) {
      fileReader.readAsDataURL(file);
      fileReader.onload = (ev) => {
        this.imageURL = ev.target.result
      };
      // form data to upload
      this.uploadeImageFromGallary(file);
    } else {
      console.log('?????? ?????? ???????? ?????? ???????????? ???? 1 ????????')
    }
  }

  async uploadeImageFromGallary(img) {
    let body = new FormData();
    body.append('image', img)

    this.api.postData('/api/upload/image', body).subscribe(async (res: any) => {
      this.resultUpload = res
    })
  }

  changePass() {
    this.navCtrl.navigateForward('/password-change')
  }

  saveInfo() {
    this.helper.showLoading();
    let userData = {
      name: this.user.name,
      image: this.resultUpload,
      pornDate: this.pornDate,
      gender: this.user.gender
    }

    this.api.updateData('/auth/user/update/' + this.user._id, userData).subscribe((res) => {
      if (res) {
        console.log('res', res);
        this.authService.updateUserData(res);
        this.helper.dismissLoading();
        this.navCtrl.navigateBack('/tabs/account')
      }
    }, (err) => {
      console.log('err', err);
      this.helper.showToast('?????? ?????? ???????????????? ???????? ???????????????? ??????????');
      this.helper.dismissLoading();

    });


  }


}
