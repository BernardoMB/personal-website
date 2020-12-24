import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-root',
  templateUrl: './projects-root.component.html',
  styleUrls: ['./projects-root.component.scss']
})
export class ProjectsRootComponent implements OnInit {
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

  ngOnInit(): void {
  }

}
