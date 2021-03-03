import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private loaderService: LoaderService) { }

  sendEmail(name: string, email: string, message: string): Observable<boolean> {
    this.loaderService.show();
    // TODO: Make http call to API
    return new Observable(obs => {
      setTimeout(() => {
        obs.next(true);
        obs.complete();
        this.loaderService.hide();
      }, 5000);
    });
  }
}
