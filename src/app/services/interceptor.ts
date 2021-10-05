import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes("http://localhost:5500/auth")) {
      // console.log('this auth');
      return next.handle(req);
    }
    // console.log(req)
    // console.log(req, next)
    console.log('req', req)
    return this.addToken(req, next).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 406: // access token expired
              return this.handelError406(req, next)

            case 401: //refresh token failed
              return this.handelError401();

            default:
              return throwError(err)
          }
        } else {
          return throwError(err)
        }
      })
    )
  }

  addToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.authService.accessToken
      }
    })

    return next.handle(request)
  }

  handelError406(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getNewAccess().pipe(
      switchMap(() => {
        return this.addToken(req, next)
      })
    )
  }

  handelError401() {
    this.authService.logOut();
    return EMPTY
  }
}
