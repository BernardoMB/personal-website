import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { Project } from '../view-models/project.interface';
import { ProjectsYear } from '../view-models/projects-year.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  years = [
    {
      year: 2014,
      projects: [
        { 
          id: 1, 
          name: 'ITJ Math', 
          code: 'ITJM', 
          //thumbnail: 'https://i.imgur.com/wEQyu7O.png', 
          thumbnail: 'assets/images/portfolio/MSIcons/ITJMath.svg', 
          description: `
            <p>This application was originally designed for students at ITJ (Thomas Jefferson Institute).</p>
            <p>With this application student were able to compute common values for specifical mathematical problems. It served as a usefull tool to check answers. It also has a section were student were able to check all mathematical formulas for a given type of problem.</p>
            <p>Among it's several functionalities, it has a portal where teachers were able to upload tasks so students can review them later at home.</p>
            <p><b>Features</b></p>
            <ul>
              <li>Calculator</li>
              <li>Mathematical cheat sheet</li>
              <li>School portal</li>
              <li>Homework repository</li>
              <li>Blog</li>
            </ul>
          `,
          images: [
            'assets/images/portfolio/ITJM/ITJMath01.png',
            'assets/images/portfolio/ITJM/ITJMath02.png',
            'assets/images/portfolio/ITJM/ITJMath03.png',
            'assets/images/portfolio/ITJM/ITJMath04.png',
            'assets/images/portfolio/ITJM/ITJMath05.png',
            'assets/images/portfolio/ITJM/ITJMath06.png',
            'assets/images/portfolio/ITJM/ITJMath07.png',
            'assets/images/portfolio/ITJM/ITJMath08.png',
            'assets/images/portfolio/ITJM/ITJMath09.png',
            'assets/images/portfolio/ITJM/ITJMath10.png'
          ]
        }
      ]
    },
    {
      year: 2015,
      projects: [
        { 
          id: 2, 
          name: 'Morpheus', 
          code: 'MPHS', 
          thumbnail: 'assets/images/portfolio/MSIcons/Maps.svg', 
          description: `
            <p>This information is confidential.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        }
      ]
    },
    {
      year: 2016,
      projects: [
        { 
          id: 3, 
          name: 'Trinity', 
          code: 'TRNY', 
          thumbnail: 'assets/images/portfolio/MSIcons/LinkAnalysis.svg', 
          description: `
            <p>This information is confidential.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        }
      ]
    },
    {
      year: 2017,
      projects: [
        { 
          id: 4, 
          name: 'Matrix Catcher', 
          code: 'IMSI', 
          thumbnail: 'assets/images/portfolio/MSIcons/MatrixCatcher.svg', 
          description: `
            <p>This information is confidential.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        }
      ]
    },
    {
      year: 2018,
      projects: [
        { 
          id: 5, 
          name: 'Sion', 
          code: 'SION', 
          thumbnail: 'assets/images/portfolio/MSIcons/Sion.svg', 
          description: `
            <p>This information is confidential.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        { 
          id: 6, 
          name: 'Koomkin Brief', 
          code: 'BRIF', 
          thumbnail: 'assets/images/portfolio/MSIcons/Informe.svg', 
          description: `
            <p>Calculate bondage index with user's info to launch bussines proposal.</p>
            <p>Koomkin's biggets form for gathering potential client information.</p>
            <p>This application estimates the number of leads that can be generated for given customer depending on its characteristics.</p>
            <p>It also shows how Koomkin's Dashboard will look like if the customer purchases a Koomkin subscription.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
          ]
        },
      ]
    },
    {
      year: 2019,
      projects: [
        { 
          id: 7, 
          name: 'Finero', 
          code: 'FNRO', 
          thumbnail: 'assets/images/portfolio/MSIcons/AdminPanel.svg', 
          description: `
            <p>Application for processing payments.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
          ]
        },
        { 
          id: 8, 
          name: 'Newt Admin Panel', 
          code: 'NWAP', 
          thumbnail: 'assets/images/portfolio/MSIcons/Newt.svg', 
          description: `
            <p>Application for processing payments.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
          ]
        },
        { 
          id: 9, 
          name: 'Newt Landing Page', 
          code: 'NWLP', 
          thumbnail: 'assets/images/portfolio/MSIcons/NewtLanding.svg', 
          description: `
            <p>Application for processing payments.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
            'assets/images/portfolio/confidential.svg',
          ]
        }
      ]
    },
    {
      year: 2018,
      projects: [
        { id: 6, name: 'Proyect 6', code: 'PJT1', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` },
        { id: 7, name: 'Proyect 7', code: 'PJT2', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` },
        { id: 8, name: 'Proyect 8', code: 'PJT3', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` }
      ]
    },
    {
      year: 2019,
      projects: [
        { id: 9, name: 'Proyect 9', code: 'PJT1', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` },
        { id: 10, name: 'Proyect 10', code: 'PJT2', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` },
        { id: 11, name: 'Proyect 11', code: 'PJT3', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` }
      ]
    },
    {
      year: 2020,
      projects: [
        { id: 12, name: 'Proyect 12', code: 'PJT1', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` },
        { id: 13, name: 'Proyect 13', code: 'PJT2', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` },
        { id: 14, name: 'Proyect 14', code: 'PJT3', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` },
        { id: 15, name: 'Proyect 15', code: 'PJT4', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` },
        { id: 16, name: 'Proyect 16', code: 'PJT5', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` },
        { id: 17, name: 'Proyect 17', code: 'PJT6', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` }
      ]
    },
    {
      year: 2021,
      projects: [
        { id: 18, name: 'Proyect 18', code: 'PJT1', thumbnail: 'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>` }
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
      }, 1000);
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
      }, 1000);
    });
  }

}
