import { Project } from "./project.interface";

export interface ProjectsYear {
  year: number;
  projects: Project[];
  images?: string[];
}
