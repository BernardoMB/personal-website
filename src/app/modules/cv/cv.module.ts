import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvRootComponent } from './components/cv-root/cv-root.component';
import { CvComponent } from './components/cv/cv.component';
import { ResumeComponent } from './components/resume/resume.component';


@NgModule({
  declarations: [CvRootComponent, CvComponent, ResumeComponent],
  imports: [
    CommonModule,
    CvRoutingModule
  ]
})
export class CvModule { }
