import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BaseUrl = 'http://192.168.1.15:3000'
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


  postOtp(endPoint: string, body: any) {
    return this.http
      .post('http://209.250.237.58:3016/otp' + endPoint, body)
      .pipe(take(1));
  }

}
