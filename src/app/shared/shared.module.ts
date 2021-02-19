import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiesPolicyDialogComponent } from './components/cookies-policy-dialog/cookies-policy-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderService } from './services/loader.service';
import { ThemeService } from './services/theme.service';
import { LoadingbarComponent } from './components/loadingbar/loadingbar.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivacyDialogComponent } from './components/privacy-dialog/privacy-dialog.component';
import { TermDialogComponent } from './components/term-dialog/term-dialog.component';

@NgModule({
  declarations: [CookiesPolicyDialogComponent, LoadingbarComponent, ScrollToTopComponent, PrivacyDialogComponent, TermDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  entryComponents: [
    CookiesPolicyDialogComponent,
    PrivacyDialogComponent,
    TermDialogComponent
  ],
  exports: [
    LoadingbarComponent,
    ScrollToTopComponent
  ],
  providers: [
    ThemeService,
    LoaderService
  ]
})
export class SharedModule { }
