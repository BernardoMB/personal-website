import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsRootComponent } from './components/projects-root/projects-root.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProjectsService } from './services/projects.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProjectDetailResoverService } from './services/project-detail.resover.service';
import { CoolBorderComponent } from '../../shared/components/cool-border/cool-border.component';
import { SharedModule } from '../../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ProjectsRootComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    SharedModule,
    SwiperModule,
    MatIconModule
  ],
  providers: [
    ProjectsService,
    ProjectDetailResoverService
  ]
})
export class ProjectsModule { }
