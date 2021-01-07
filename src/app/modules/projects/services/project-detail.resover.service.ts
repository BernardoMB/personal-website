import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Project } from '../view-models/project.interface';
import { ProjectsService } from './projects.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailResoverService implements Resolve<any> {

  constructor(private projectsService: ProjectsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const projectId = route.params.id;
    return this.projectsService.getProyectById(projectId).pipe(
      map((project: Project) => {
        console.log('Got from service', project);
        if (project) {
          console.log('Returning project', project);
          return {
            project
          };
        } else {
          console.log('Returning null');
          return {
            project: null
          };
        }
      })
    );
  }
}
