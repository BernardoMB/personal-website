import { Component } from '@angular/core';
import { skip } from 'rxjs/operators';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme = 'light-theme';

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.themeService.setTheme(storedTheme);
    } else {
      localStorage.setItem('theme', 'light-theme');
    }

    this.themeService.selectedTheme$.pipe(skip(0)).subscribe((theme: string) => {
      this.theme = theme;
    });
  }

}
