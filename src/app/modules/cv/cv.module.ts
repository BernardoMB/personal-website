import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvRoutingModule } from './cv-routing.module';
import { CvRootComponent } from './components/cv-root/cv-root.component';
import { CvComponent } from './components/cv/cv.component';
import { ResumeComponent } from './components/resume/resume.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [CvRootComponent, CvComponent, ResumeComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    MatTabsModule,
    MatIconModule
  ]
})
export class CvModule { }
