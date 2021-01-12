import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeService {
  private selectedThemeSubject = new BehaviorSubject<string>('');
  public selectedTheme$ = this.selectedThemeSubject.asObservable();

  constructor() {}

  setTheme(theme: string) {
    this.selectedThemeSubject.next(theme);
  }
}
