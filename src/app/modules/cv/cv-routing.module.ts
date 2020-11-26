import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvRootComponent } from './components/cv-root/cv-root.component';

const routes: Routes = [
  { path: '', component: CvRootComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
