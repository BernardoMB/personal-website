import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutRootComponent } from './components/about-root/about-root.component';

const routes: Routes = [
  { path: '', component: AboutRootComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
