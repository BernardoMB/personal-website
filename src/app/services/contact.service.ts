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
        this.loaderService.hide();
        throw errorResponse.error;
      })
    );
  }

  sendFeedback(description: string, screenshot: string): Observable<string> {
    this.loaderService.show();
    const url = 'https://9s8f1zma6g.execute-api.us-west-2.amazonaws.com/default/SendFeedbackFromPersonalWebsite';
    const sendFeedbackDTO = { description, screenshot }; // DTO: Data Transfer Object
    return this.http.post<any>(url, sendFeedbackDTO).pipe(
      tap(() => {
        this.loaderService.hide();
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        alert(`Error sending feedback. Try again later. ${errorResponse.error.message}`);
        this.loaderService.hide();
        throw errorResponse.error;
      })
    );
    /* return new Observable(obs => {
      setTimeout(() => {
        obs.next(true);
        obs.complete();
        this.loaderService.hide();
      }, 2000);
    }); */
  }

  buyCoffee(paymentDto: any): Observable<{ success: boolean; errorMessage: string }> {
    this.loaderService.show();
    const url = 'https://9s8f1zma6g.execute-api.us-west-2.amazonaws.com/default/buymeacoffee';
    return this.http.post<any>(url, {...paymentDto}).pipe(
      tap(() => {
        this.loaderService.hide();
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        alert(`Error buying coffee. Try again later. ${errorResponse.error.message}`);
        this.loaderService.hide();
        throw errorResponse.error;
      })
    );
  }
}
