import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getProjectYears, getTotalProjects } from '../../../../store/projects/projects.actions';
import { selectProjectYears, selectTotalProjects } from '../../../../store/projects/projects.selectors';
import { ProjectsState } from '../../../../store/projects/projects.state';
import { ProjectsService } from '../../services/projects.service';
import { ProjectsYear } from '../../view-models/projects-year.interface';

@Component({
  selector: 'app-projects-root',
  templateUrl: './projects-root.component.html',
  styleUrls: ['./projects-root.component.scss']
})
export class ProjectsRootComponent implements OnInit, OnDestroy {
  years: ProjectsYear[] = [];
  yearsSubscription: Subscription = new Subscription;
  totalProjects: number | undefined;
  totalProjetsSubscription: Subscription | undefined;
  projectYears: ProjectsYear[] | undefined;
  projetYearsSubscription: Subscription | undefined;

  constructor(
    private projectsService: ProjectsService,
    private projectsStore: Store<ProjectsState>
  ) { }

  ngOnInit(): void {
    this.yearsSubscription = this.projectsService.getProyectsYears().subscribe((years: ProjectsYear[]) => {
      // console.log('Years', years);
      this.years =  years;
    });

    // Approach 1 (Service) [Every component must make this service all to get total projects]
    /* this.totalProjetsSubscription = this.projectsService.getTotalProjects().subscribe((totalProjects: number) => {
      this.totalProjects = totalProjects;
    }); */

    // Approach 2 (Store) [Call to get total projects can only be called once and every component subscribed to the store will get updated]
    this.projectsStore.dispatch(getTotalProjects());
    this.totalProjetsSubscription = this.projectsStore.select(selectTotalProjects).subscribe((totalProjects: number) => {
      this.totalProjects = totalProjects;
    });

    // Projects
    this.projectsStore.dispatch(getProjectYears());
    this.projetYearsSubscription = this.projectsStore.select(selectProjectYears).subscribe((projectYears: ProjectsYear[]) => {
      this.projectYears = projectYears;
    });
  }

  ngOnDestroy(): void {
    this.yearsSubscription?.unsubscribe();
    this.totalProjetsSubscription?.unsubscribe();
    this.projetYearsSubscription?.unsubscribe();
  }

}
