import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectsRootComponent } from './components/projects-root/projects-root.component';

const routes: Routes = [
  { path: '', component: ProjectsRootComponent },
  { path: ':project_id', component: ProjectDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
