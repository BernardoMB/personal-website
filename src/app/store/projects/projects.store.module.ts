import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProjectsEffects } from "./projects.effects";
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
      ProjectsEffects
    ])
  ]
})
export class ProjectsStoreModule {}
