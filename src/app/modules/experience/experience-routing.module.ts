import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperienceRootComponent } from './components/experience-root/experience-root.component';
import { CvComponent } from './components/cv/cv.component';
import { ResumeComponent } from './components/resume/resume.component';

const routes: Routes = [
  {
    path: '',
    component:
    ExperienceRootComponent,
    /* children: [
      { path: '', redirectTo: 'cv', pathMatch: 'full' },
      { path: 'cv', component: CvComponent },
      { path: 'resume', component: ResumeComponent },
    ] */
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperienceRoutingModule { }
