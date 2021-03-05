import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HobbiesRoutingModule } from './hobbies-routing.module';
import { HobbiesRootComponent } from './components/hobbies-root/hobbies-root.component';
import { HobbiesResolverService } from './services/hobbies-resolver.service';
import { HobbiesService } from './services/hobbies.service';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [HobbiesRootComponent],
  imports: [
    CommonModule,
    HobbiesRoutingModule,
    MatCardModule
  ],
  providers: [
    HobbiesResolverService,
    HobbiesService
  ]
})
export class HobbiesModule { }
