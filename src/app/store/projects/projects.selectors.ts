import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { projectsFeatureKey } from "./projects.reducer";
import { ProjectsState } from "./projects.state";

const getTotalProjects = (state: ProjectsState): number => state.totalProjects;

// Select feature state
export const selectProjectsState: MemoizedSelector<object, ProjectsState> = createFeatureSelector<ProjectsState>(projectsFeatureKey);

// Select values from feature state
export const selectTotalProjects: MemoizedSelector<object, number> = createSelector(selectProjectsState, getTotalProjects);
