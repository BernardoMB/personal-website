import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutRootComponent } from './components/about-root/about-root.component';
import { BiographyComponent } from './components/biography/biography.component';
import { DescriptionComponent } from './components/description/description.component';

const routes: Routes = [
  {
    path: '',
    component:
    AboutRootComponent,
    children: [
      { path: '', redirectTo: 'description', pathMatch: 'full' },
      { path: 'description', component: DescriptionComponent },
      { path: 'biography', component: BiographyComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
