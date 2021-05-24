import { createAction, props } from '@ngrx/store';

export const getTotalProjects = createAction('[Projects] GetTotalProjects');
export const getTotalProjectsSuccess = createAction('[Projects] GetTotalProjectsSuccess', props<{ totalProjects: number }>());
export const getTotalProjectsFailure = createAction('[Projects] GetTotalProjectsFailure');
