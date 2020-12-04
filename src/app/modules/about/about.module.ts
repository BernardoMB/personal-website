import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutRootComponent } from './components/about-root/about-root.component';
import { DescriptionComponent } from './components/description/description.component';
import { BiographyComponent } from './components/biography/biography.component';


@NgModule({
  declarations: [AboutRootComponent, DescriptionComponent, BiographyComponent],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
