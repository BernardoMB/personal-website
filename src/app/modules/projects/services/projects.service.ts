import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';
import { Project } from '../view-models/project.interface';
import { ProjectsYear } from '../view-models/projects-year.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  years = [
    {
      year: 2017,
      projects: [
        { id: 1, name: 'Proyect 1', code: 'PJT1', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 2, name: 'Proyect 2', code: 'PJT2', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 3, name: 'Proyect 3', code: 'PJT3', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 4, name: 'Proyect 4', code: 'PJT4', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 5, name: 'Proyect 5', code: 'PJT5', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }
      ]
    },
    {
      year: 2018,
      projects: [
        { id: 6, name: 'Proyect 6', code: 'PJT1', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 7, name: 'Proyect 7', code: 'PJT2', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 8, name: 'Proyect 8', code: 'PJT3', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }
      ]
    },
    {
      year: 2019,
      projects: [
        { id: 9, name: 'Proyect 9', code: 'PJT1', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 10, name: 'Proyect 10', code: 'PJT2', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 11, name: 'Proyect 11', code: 'PJT3', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }
      ]
    },
    {
      year: 2020,
      projects: [
        { id: 12, name: 'Proyect 12', code: 'PJT1', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 13, name: 'Proyect 13', code: 'PJT2', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 14, name: 'Proyect 14', code: 'PJT3', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 15, name: 'Proyect 15', code: 'PJT4', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 16, name: 'Proyect 16', code: 'PJT5', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { id: 17, name: 'Proyect 17', code: 'PJT6', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }
      ]
    },
    {
      year: 2021,
      projects: [
        { id: 18, name: 'Proyect 18', code: 'PJT1', image: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }
      ]
    },
  ];

  constructor(
    private loaderService: LoaderService
  ) { }

  getProyectsYears(): Observable<ProjectsYear[]> {
    this.loaderService.show();
    return new Observable(obs => {
      setTimeout(() => {
        obs.next(this.years);
        obs.complete();
        this.loaderService.hide();
      }, 5000);
    });
  }

  getProyectById(id: number): Observable<Project> {
    this.loaderService.show();
    let found: Project | undefined = undefined;
    let i = 0;
    while (found == null && i < this.years.length) {
      let j = 0;
      const year = this.years[i];
      while (found == null && j < year.projects.length) {
        const project = year.projects[j];
        if (id == project.id) {
          found = project;
        }
        j++;
      }
      i++; // i = i + 1; // i += 1; // i -= -1;
    }
    return new Observable(obs => {
      setTimeout(() => {
        obs.next(found);
        obs.complete();
        this.loaderService.hide();
      }, 2000);
    });
  }

}
