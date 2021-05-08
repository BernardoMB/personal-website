import { Action, createReducer, on } from "@ngrx/store";
import { initialProjectsState, ProjectsState } from "./projects.state";

export const projectsFeatureKey = 'projects';

const projectsReducer = createReducer(
  initialProjectsState,
  on(ProjectsActions.getTotalProjectsSuccess, (state: ProjectsState, payload: { total: number }) => {
    return {
      ...state,
      totalProjects: payload.total
    };
  })
);

export function reducer(state: ProjectsState | undefined, action: Action) {
  return projectsReducer(state, action);
}
