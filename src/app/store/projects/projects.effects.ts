import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProjectsService } from '../../modules/projects/services/projects.service';
import { getTotalProjects, getTotalProjectsFailure, getTotalProjectsSuccess } from './projects.actions';

@Injectable()
export class ProjectsEffects {

  getTotalProjectsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(getTotalProjects),
    exhaustMap((action) => this.projectsService.getTotalProjects().pipe(
      map((totalProjects: number) => {
        return getTotalProjectsSuccess({totalProjects});
      }),
      catchError((error) => {
        return of(
          getTotalProjectsFailure
        );
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}

}
