import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectsYear } from '../view-models/projects-year.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  years = [
    {
      year: 2017,
      projects: [
        { name: 'Proyect 1', code: 'PJT1' },
        { name: 'Proyect 2', code: 'PJT2' },
        { name: 'Proyect 3', code: 'PJT3' },
        { name: 'Proyect 4', code: 'PJT4' },
        { name: 'Proyect 5', code: 'PJT5' }
      ]
    },
    {
      year: 2018,
      projects: [
        { name: 'Proyect 1', code: 'PJT1' },
        { name: 'Proyect 2', code: 'PJT2' },
        { name: 'Proyect 3', code: 'PJT3' }
      ]
    },
    {
      year: 2019,
      projects: [
        { name: 'Proyect 1', code: 'PJT1' },
        { name: 'Proyect 2', code: 'PJT2' },
        { name: 'Proyect 3', code: 'PJT3' }
      ]
    },
    {
      year: 2020,
      projects: [
        { name: 'Proyect 1', code: 'PJT1' },
        { name: 'Proyect 2', code: 'PJT2' },
        { name: 'Proyect 3', code: 'PJT3' },
        { name: 'Proyect 4', code: 'PJT4' },
        { name: 'Proyect 5', code: 'PJT5' },
        { name: 'Proyect 6', code: 'PJT6' }
      ]
    },
    {
      year: 2021,
      projects: [
        { name: 'Proyect 1', code: 'PJT1' }
      ]
    },
  ];

  constructor() { }

  getProyectsYears(): Observable<ProjectsYear[]> {
    return new Observable(obs => {
      setTimeout(() => {
        obs.next(this.years);
        obs.complete();
      }, 5000);
    });
  }
}
