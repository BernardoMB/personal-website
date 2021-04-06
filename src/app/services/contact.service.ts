import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private loaderService: LoaderService,
    private http: HttpClient
  ) { }

  sendEmail(name: string, email: string, message: string): Observable<string> {
    this.loaderService.show();
    const url = `https://9s8f1zma6g.execute-api.us-west-2.amazonaws.com/default/SendEmailFromPersonalWebsiteMessage`;
    const sendMessageFromSenderDTO = {
      "SenderName": name,
      "SenderEmailAddress": email,
      "SenderMessage": message
    };
    return this.http.post<string>(url, sendMessageFromSenderDTO).pipe(
      tap(() => {
        this.loaderService.hide();
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        alert(`Error sending message. Try again later. ${errorResponse.error.message}`);
        throw errorResponse.error;
        this.loaderService.hide();
      })
    );
  }

  sendFeedback(description: string, screenshot: string): Observable<boolean> {
    this.loaderService.show();
    // TODO: Make http call to API
    /* const url = 'https://wumc802kr5.execute-api.us-west-1.amazonaws.com/testing/feedback';
    return this.http.post<any>(url, {
      description,
      screenshot,
    }); */
    return new Observable(obs => {
      setTimeout(() => {
        obs.next(true);
        obs.complete();
        this.loaderService.hide();
      }, 2000);
    });
  }

}
