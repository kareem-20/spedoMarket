import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { HeadersInterceptor } from './services/interceptor';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    GooglePlus, Storage, Camera, File, FileTransfer, SignInWithApple, Geolocation
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
