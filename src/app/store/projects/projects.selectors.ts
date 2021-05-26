import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { ProjectsYear } from "../../modules/projects/view-models/projects-year.interface";
import { projectsFeatureKey } from "./projects.reducer";
import { ProjectsState } from "./projects.state";

const getTotalProjects = (state: ProjectsState): number => state.totalProjects;
const getProjectYears = (state: ProjectsState): ProjectsYear[] => state.projectYears;

// Select feature state
export const selectProjectsState: MemoizedSelector<object, ProjectsState> = createFeatureSelector<ProjectsState>(projectsFeatureKey);

// Select values from feature state
export const selectTotalProjects: MemoizedSelector<object, number> = createSelector(selectProjectsState, getTotalProjects);
export const selectProjectYears: MemoizedSelector<object, ProjectsYear[]> = createSelector(selectProjectsState, getProjectYears);
