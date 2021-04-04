import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { fromEvent, of } from 'rxjs';
import { map, pairwise, skip, switchMap, throttleTime } from 'rxjs/operators';
import { DocumentRef } from '../../providers/document.provider';
import { WindowRef } from '../../providers/window.provider';
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
  selectedLanguage: string = '';

  //#region Sticky header
  isSticky = false;
  @HostListener('window:scroll', [])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }
  //#endregion

  //#region Scroll to section
  private window: Window;
  private document: Document;
  currentSection = '';
  onLandingPage: boolean = false;
  //#endregion

  constructor(
    private themeService: ThemeService,
    private router: Router, // Dependency Injection
    private translateService: TranslateService,
    //#region Scroll to section
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(WindowRef) private windowRef: WindowRef,
    @Inject(DocumentRef) private documentRef: DocumentRef
    //#endregion
  ) {
    // Code executes on component initialization
    //console.log('Executing constructor');
    this.selectedLanguage = translateService.currentLang;
    //#region Scroll to section
    this.window = <Window>this.windowRef.nativeWindow;
    this.document = <Document>this.documentRef.nativeDocument;
    //#endregion
  }

  ngOnInit(): void {
    // Code executes after component has been initialized
    //console.log('Executing ngOnInit hook');

    this.themeService.selectedTheme$.pipe(
      // skip(0)
    ).subscribe((theme: string) => {
      this.themeControl.setValue(theme, {emitEvent: false});
    });

    this.themeControl.valueChanges.subscribe((value) => {
      this.themeService.setTheme(value);
      localStorage.setItem('theme', <string>value);
    });

    //#region Scroll to section
    if (isPlatformBrowser(this.platformId)) {
      this.window = <Window>this.windowRef.nativeWindow;
      this.document = <Document>this.documentRef.nativeDocument;
      fromEvent(this.window, 'scroll')
        .pipe(
          map(() => this.window.pageYOffset),
          pairwise(),
          map(([prev, curr]) => Math.abs(prev - curr) > 20),
          switchMap(isFast => {
            if (isFast) {
              return of({}).pipe(throttleTime(20));
            } else {
              return of({});
            }
          })
        )
        .subscribe(() => {
          const offset = this.window.pageYOffset/*  + this.window.screen.height / 2 */;
          //console.log(offset);
          const sectionsIds = ['top', 'services', 'contact'];
          sectionsIds.forEach((sectionId: string) => {
            !!this.document.getElementById(sectionId) ? this.onLandingPage = true : this.onLandingPage = false;
          });
          if (this.onLandingPage) {
            const offsets = sectionsIds.map(id => {
              if (!!this.document.getElementById(id)) {
                return (this.document as any).getElementById(id).offsetTop;
              } else {
                return 0;
              }
            });
            //console.log(offsets);
            if (offsets[0] <= offset && offset < offsets[1]) {
              this.currentSection = 'top';
            } else if (offsets[1] <= offset && offset < offsets[2]) {
              this.currentSection = 'services';
            } else if (offsets[2] <= offset) {
              this.currentSection = 'contact';
            }
          } else {
            this.currentSection = '';
          }
          //console.log(this.currentSection);
        });
    }
    //#endregion
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);
  }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }

  shareOnFacebook() {
    console.log('Clicked share on Facebook button');
    const shareOnFacebookButton = this.document.getElementById('facebook-share-button');
    console.log(shareOnFacebookButton);
    shareOnFacebookButton?.click();
    shareOnFacebookButton!.click();
  }

}
