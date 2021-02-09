import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiesPolicyDialogComponent } from './components/cookies-policy-dialog/cookies-policy-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderService } from './services/loader.service';
import { ThemeService } from './services/theme.service';
import { LoadingbarComponent } from './components/loadingbar/loadingbar.component';

@NgModule({
  declarations: [CookiesPolicyDialogComponent, LoadingbarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [
    CookiesPolicyDialogComponent
  ],
  exports: [
    LoadingbarComponent
  ],
  providers: [
    ThemeService,
    LoaderService
  ]
})
export class SharedModule { }
