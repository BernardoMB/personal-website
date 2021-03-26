import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvRoutingModule } from './cv-routing.module';
import { CvRootComponent } from './components/cv-root/cv-root.component';
import { CvComponent } from './components/cv/cv.component';
import { ResumeComponent } from './components/resume/resume.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';

@NgModule({
  declarations: [CvRootComponent, CvComponent, ResumeComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class CvModule { }
