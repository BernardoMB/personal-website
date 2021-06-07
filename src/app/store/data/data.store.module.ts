import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { DataEffects } from "./data.effects";
import * as fromData from "./data.reducer";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromData.dataFeatureKey,
      fromData.reducer
    ),
    EffectsModule.forFeature([
      DataEffects
    ])
  ]
})
export class DataStoreModule {}
