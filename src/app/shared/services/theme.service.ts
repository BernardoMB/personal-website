import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeService {
  private selectedThemeSubject = new BehaviorSubject<string>('');
  public selectedTheme$ = this.selectedThemeSubject.asObservable();

  setTheme(theme: string) {
    console.log('Selected theme:', theme);
    this.selectedThemeSubject.next(theme);
  }
}
