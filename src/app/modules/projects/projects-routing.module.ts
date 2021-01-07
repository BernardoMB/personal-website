import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectsRootComponent } from './components/projects-root/projects-root.component';
import { ProjectDetailResoverService } from './services/project-detail.resover.service';

const routes: Routes = [
  { path: '', component: ProjectsRootComponent },
  { path: ':id', component: ProjectDetailComponent, resolve: { projectDetailInfo: ProjectDetailResoverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
