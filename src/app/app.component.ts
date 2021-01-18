import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { pairwise, skip } from 'rxjs/operators';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  theme = 'light-theme';
  selectedThemesubscription: Subscription | undefined;

  constructor(private themeService: ThemeService, private overlayContainer: OverlayContainer) {

  }

  ngOnInit() {
    // theme: light-theme, dark-theme, etc.
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.themeService.setTheme(storedTheme);
    } else {
      // TODO: Default theme should be a configuration variable.
      this.themeService.setTheme('light-theme');
    }

    this.themeService.selectedTheme$.pipe().subscribe((theme: string) => {
      this.theme = theme;
      this.overlayContainer.getContainerElement().classList.add(<string>theme);
    });

    this.selectedThemesubscription = this.themeService.selectedTheme$.pipe(
      pairwise()
    ).subscribe((theme) => {
      const previous = theme[0];
      const current = theme[1];
      this.theme = current;
      this.overlayContainer.getContainerElement().classList.remove(<string>previous);
      this.overlayContainer.getContainerElement().classList.add(<string>current);
    });
  }

  ngOnDestroy() {
    this.selectedThemesubscription?.unsubscribe();
  }

}
