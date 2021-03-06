import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutRootComponent } from './components/about-root/about-root.component';
import { DescriptionComponent } from './components/description/description.component';
import { BiographyComponent } from './components/biography/biography.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgParticlesModule } from 'ng-particles';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [AboutRootComponent, DescriptionComponent, BiographyComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    NgParticlesModule,
    MatToolbarModule,
    MatIconModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class AboutModule { }
