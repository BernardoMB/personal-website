import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvRootComponent } from './components/cv-root/cv-root.component';


@NgModule({
  declarations: [CvRootComponent],
  imports: [
    CommonModule,
    CvRoutingModule
  ]
})
export class CvModule { }
