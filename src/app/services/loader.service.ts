import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    console.log('Nexting true');
    this.loaderSubject.next({ show: true } as LoaderState);
  }

  hide() {
    console.log('Nexting false');
    this.loaderSubject.next({ show: false } as LoaderState);
  }
}
