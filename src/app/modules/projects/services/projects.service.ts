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
            <a href="https://github.com/BernardoMB">Repo</a>
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
            <p>More infromation coming soon.</p>
          `,
          images: [
            'https://i.imgur.com/obM2u2u.png',
            'https://i.imgur.com/LHudrdM.png',
            'https://i.imgur.com/e4xGBqx.png',
            'https://i.imgur.com/vAILoQw.png',
            'https://i.imgur.com/1NfL8MX.png',
            'https://i.imgur.com/C8Zq1RU.png',
            'https://i.imgur.com/T8sc4XJ.png',
            'https://i.imgur.com/6bTm3iM.png',
            'https://i.imgur.com/50eD5Dj.png',
            'https://i.imgur.com/6PfXZUk.png',
            'https://i.imgur.com/3xi3ZfD.png',
            'https://i.imgur.com/rgt7zuh.png'
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
            <p>Application for processing payments. More infromation coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg',
          ]
        },
        { 
          id: 8, 
          name: 'Newt Admin Panel', 
          code: 'NWAP', 
          thumbnail: 'assets/images/portfolio/MSIcons/Newt.svg', 
          description: `
            <p>Application for processing payments. More information coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg',
          ]
        },
        { 
          id: 9, 
          name: 'Newt Landing Page', 
          code: 'NWLP', 
          thumbnail: 'assets/images/portfolio/MSIcons/NewtLanding.svg', 
          description: `
            <p>Application for processing payments. More information coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg',
          ]
        },
        { 
          id: 10, 
          name: 'Newt Press', 
          code: 'NWPS', 
          thumbnail: 'assets/images/portfolio/MSIcons/NewtPress.svg', 
          description: `
            <p>More information coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg',
          ]
        }
      ]
    },
    {
      year: 2020,
      projects: [
        { 
          id: 11, 
          name: 'Aurora Admin Panel', 
          code: 'AUAP', 
          thumbnail: 'assets/images/portfolio/MSIcons/AuroraAdminPanel.svg', 
          description: `
            <p>More information coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        { 
          id: 12, 
          name: 'Invest Naija Website', 
          code: 'AUWS', 
          thumbnail: 'assets/images/portfolio/MSIcons/AuroraWebsite.svg', 
          description: `
            <p>More information coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        { 
          id: 13, 
          name: 'Medkush', 
          code: 'MEDK', 
          thumbnail: 'assets/images/portfolio/MSIcons/Medkush.svg', 
          description: `
            <p>More information coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        { 
          id: 14, 
          name: 'Out of Your Mind', 
          code: 'OTMD', 
          thumbnail: 'assets/images/portfolio/MSIcons/OM.svg', 
          description: `
            <p>More information coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        { 
          id: 15, 
          name: 'Staff Plan', 
          code: 'STFF', 
          thumbnail: 'assets/images/portfolio/MSIcons/StaffPlan.svg', 
          description: `
            <p>More information coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        { 
          id: 16, 
          name: 'Trinity 2.0', 
          code: 'TRN2', 
          thumbnail: 'assets/images/portfolio/MSIcons/Trinity2.svg', 
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
      year: 2021,
      projects: [
        { 
          id: 17, 
          name: 'Personal Wesbite', 
          code: 'BMBW', 
          thumbnail: 'assets/images/portfolio/MSIcons/PersonalWebsite.svg', 
          description: `
            <p>More information coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        }
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
