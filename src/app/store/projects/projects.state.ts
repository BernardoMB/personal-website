import { ProjectsYear } from "../../modules/projects/view-models/projects-year.interface";

export interface ProjectsState {
  totalProjects: number;
  projectYears: ProjectsYear[];
}

export const initialProjectsState: ProjectsState = {
  totalProjects: 0,
  projectYears: []
};
