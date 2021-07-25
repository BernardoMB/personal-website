import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HobbiesRoutingModule } from './hobbies-routing.module';
import { HobbiesRootComponent } from './components/hobbies-root/hobbies-root.component';
import { HobbiesResolverService } from './services/hobbies-resolver.service';
import { HobbiesService } from './services/hobbies.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';


@NgModule({
  declarations: [HobbiesRootComponent],
  imports: [
    CommonModule,
    HobbiesRoutingModule,
    MatCardModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    HobbiesResolverService,
    HobbiesService
  ]
})
export class HobbiesModule { }
