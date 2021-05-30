import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoffeeRootComponent } from './components/coffee-root/coffee-root.component';

const routes: Routes = [
  { path: '', component: CoffeeRootComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoffeeRoutingModule { }
