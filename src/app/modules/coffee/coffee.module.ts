import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeRoutingModule } from './coffee-routing.module';
import { CoffeeRootComponent } from './components/coffee-root/coffee-root.component';


@NgModule({
  declarations: [CoffeeRootComponent],
  imports: [
    CommonModule,
    CoffeeRoutingModule
  ]
})
export class CoffeeModule { }
