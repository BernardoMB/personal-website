import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsRootComponent } from './components/projects-root/projects-root.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ProjectsRootComponent, ProjectDetailComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatTooltipModule
  ]
})
export class ProjectsModule { }
