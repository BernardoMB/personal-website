import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: LandingComponent },
      { path: 'about', loadChildren: () => import('./modules/about/about.module').then(mod => mod.AboutModule) },
      { path: 'experience', loadChildren: () => import('./modules/experience/experience.module').then(mod => mod.ExperienceModule) },
      { path: 'projects', loadChildren: () => import('./modules/projects/projects.module').then(mod => mod.ProjectsModule) },
      { path: 'hobbies', loadChildren: () => import('./modules/hobbies/hobbies.module').then(mod => mod.HobbiesModule) },
      { path: 'donate', loadChildren: () => import('./modules/coffee/coffee.module').then(mod => mod.CoffeeModule) },
      { path: 'not-found', component: NotFoundComponent }
    ]
  },
  {
    path: '**', redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    // Scrolling to section
    scrollOffset: [0, 64],
    anchorScrolling: 'enabled',
    useHash: false,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
