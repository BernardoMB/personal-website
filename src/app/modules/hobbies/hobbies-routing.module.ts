import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HobbiesRootComponent } from './components/hobbies-root/hobbies-root.component';

const routes: Routes = [
  { path: '', component: HobbiesRootComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HobbiesRoutingModule { }
