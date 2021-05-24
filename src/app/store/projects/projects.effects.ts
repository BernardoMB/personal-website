import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap } from 'rxjs/operators';
import { ProjectsService } from '../../modules/projects/services/projects.service';
import { getTotalProjects } from './projects.actions';

@Injectable()
export class ProjectsEffects {
  // getTotalProjectsEffect$ = createEffect(() => this.actions$.pipe(
  //   ofType(getTotalProjects),
  //   exhaustMap((action) => this.proj)
  // ));

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}

}
