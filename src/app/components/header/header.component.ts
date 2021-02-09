import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { skip } from 'rxjs/operators';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public name = 'Bernardo Mondragón Brozon';
  public title = 'Actuary & Full-Stack Developer';
  public enableShareButton = true;
  @Input() initials: string | undefined;
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter();
  themeControl = new FormControl('light-theme', [Validators.required]);

  constructor(
    private themeService: ThemeService,
    private router: Router // Dependency Injection
  ) {
    // Code executes on component initialization
    console.log('Executing constructor');
  }

  ngOnInit(): void {
    // Code executes after component has been initialized
    console.log('Executing ngOnInit hook');

    this.themeService.selectedTheme$.pipe(
      // skip(0)
    ).subscribe((theme: string) => {
      this.themeControl.setValue(theme, {emitEvent: false});
    });

    this.themeControl.valueChanges.subscribe((value) => {
      this.themeService.setTheme(value);
      localStorage.setItem('theme', <string>value);
    });
  }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }

}
