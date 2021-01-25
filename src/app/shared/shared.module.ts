import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiesPolicyDialogComponent } from './components/cookies-policy-dialog/cookies-policy-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CookiesPolicyDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [
    CookiesPolicyDialogComponent
  ]
})
export class SharedModule { }
