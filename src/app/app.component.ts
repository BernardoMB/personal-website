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
    this.themeService.selectedTheme$.pipe(skip(1)).subscribe((theme: string) => {
      this.theme = theme;
    });
  }

}
