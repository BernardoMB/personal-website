import { createAction, props } from '@ngrx/store';
import { ProjectsYear } from '../../modules/projects/view-models/projects-year.interface';

export const getTotalProjects = createAction('[Projects] GetTotalProjects');
export const getTotalProjectsSuccess = createAction('[Projects] GetTotalProjectsSuccess', props<{ totalProjects: number }>());
export const getTotalProjectsFailure = createAction('[Projects] GetTotalProjectsFailure');

export const getProjectYears = createAction('[Projects] GetProjectYears');
export const getProjectYearsSuccess = createAction('[Projects] GetProjectYearsSuccess', props<{ projectYears: ProjectsYear[] }>());
export const getProjectYearsFailure = createAction('[Projects] GetProjectYearsFailure');
