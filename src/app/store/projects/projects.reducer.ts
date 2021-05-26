import { Action, createReducer, on } from '@ngrx/store';
import { initialProjectsState, ProjectsState } from './projects.state';
import * as ProjectsActions from './projects.actions';
import { ProjectsYear } from '../../modules/projects/view-models/projects-year.interface';

export const projectsFeatureKey = 'projects';

const projectsReducer = createReducer(
  initialProjectsState,
  on(
    ProjectsActions.getTotalProjectsSuccess,
    (state: ProjectsState, payload: { totalProjects: number }) => {
      return {
        ...state,
        totalProjects: payload.totalProjects
      };
    }
  ),
  on(
    ProjectsActions.getProjectYearsSuccess,
    (state: ProjectsState, payload: { projectYears: ProjectsYear[] }) => {
      return {
        ...state,
        projectYears: payload.projectYears
      };
    }
  )
);

export function reducer(state: ProjectsState | undefined, action: Action) {
  return projectsReducer(state, action);
}
