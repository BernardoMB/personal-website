import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import * as fromProjects from "./projects.reducer";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProjects.projectsFeatureKey,
      fromProjects.reducer
    ),
    EffectsModule.forFeature([
      // Add projects effects
    ])
  ]
})
export class ProjectsStoreModule {}
