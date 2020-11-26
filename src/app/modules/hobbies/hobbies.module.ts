import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HobbiesRoutingModule } from './hobbies-routing.module';
import { HobbiesRootComponent } from './components/hobbies-root/hobbies-root.component';


@NgModule({
  declarations: [HobbiesRootComponent],
  imports: [
    CommonModule,
    HobbiesRoutingModule
  ]
})
export class HobbiesModule { }
