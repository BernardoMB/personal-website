import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() initials: string | undefined;
  @Output() sideBarNavigation: EventEmitter<void> = new EventEmitter();
  themeControl = new FormControl('light-theme', [Validators.required]);
  selectedLanguage: string = '';

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.themeService.selectedTheme$.pipe(
      // skip(0)
    ).subscribe((theme: string) => {
      this.themeControl.setValue(theme, {emitEvent: false});
    });

    this.themeControl.valueChanges.subscribe((value) => {
      this.themeService.setTheme(value);
      localStorage.setItem('theme', <string>value);
    });

    this.selectedLanguage = this.translateService.currentLang;
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);
  }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }
}
