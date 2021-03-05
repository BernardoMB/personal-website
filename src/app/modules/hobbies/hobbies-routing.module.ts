import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HobbiesRootComponent } from './components/hobbies-root/hobbies-root.component';
import { HobbiesResolverService } from './services/hobbies-resolver.service';

const routes: Routes = [
  { path: '', component: HobbiesRootComponent, resolve: { hobbiesInfo: HobbiesResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HobbiesRoutingModule { }
