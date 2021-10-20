import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BaseUrl = 'http://localhost:3001';
  BaseUrl2 = "https://mooni.ngrok.io";
  constructor(
    private http: HttpClient
  ) { }

  getData(endPoint) {
    return this.http.get(this.BaseUrl + endPoint).pipe(take(1));
  }

  postData(endPoint, body) {
    return this.http.post(this.BaseUrl + endPoint, body).pipe(take(1));
  }

  updateData(endPoint, body) {
    return this.http.patch(this.BaseUrl + endPoint, body).pipe(take(1));
  }

  deleteData(endPoint) {
    return this.http.delete(this.BaseUrl + endPoint).pipe(take(1));
  }

  getOtherData(endPoint) {
    return this.http.get(this.BaseUrl2 + endPoint).pipe(take(1));
  }



  postOtp(endPoint: string, body: any) {
    return this.http
      .post('http://209.250.237.58:3016/otp' + endPoint, body)
      .pipe(take(1));
  }

}
