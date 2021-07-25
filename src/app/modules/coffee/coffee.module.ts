import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeRoutingModule } from './coffee-routing.module';
import { CoffeeRootComponent } from './components/coffee-root/coffee-root.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';


@NgModule({
  declarations: [CoffeeRootComponent],
  imports: [
    CommonModule,
    CoffeeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class CoffeeModule { }
