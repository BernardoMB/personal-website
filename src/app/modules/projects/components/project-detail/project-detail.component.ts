import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Subscription } from 'rxjs';
import { Project } from '../../view-models/project.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  projectDetailInfoSubscription: Subscription | undefined;
  project: Project | undefined;
  projects: Project[] = [];
  nextButtonDisabled: boolean = true;
  prevButtonDisabled: boolean = true;
  //#region Swiper
  index = 0;
  config: SwiperConfigInterface = {
    spaceBetween: 30,
    effect: 'fade',
    autoplay: {
      delay: 8000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: "fraction",
    },
  };
  //#endregion

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    // console.log('Resolved data', this.route.snapshot.data);
    this.projectDetailInfoSubscription = this.route.data.subscribe((data: any) => {
      if (data.projectDetailInfo.project) {
        this.project = data.projectDetailInfo.project;
        //console.log('Project', this.project);
        this.projects = data.projectDetailInfo.projects;
        //console.log('Projects', this.projects);
        this.prevButtonDisabled = this.projects.findIndex(x => x?.id === this.project?.id) === 0;
        this.nextButtonDisabled = this.projects.findIndex(x => x?.id === this.project?.id) === this.projects.length - 1;
      } else {
        alert('Project not found');
      }
    });
  }

  ngOnDestroy(): void {
    this.projectDetailInfoSubscription?.unsubscribe();
  }

  getSafeDescription(desc: string) {
    // Bypass Angular Security enabling styles tags and different sanitizer for rendered HTML in [innerHtml]
    return this.sanitizer.bypassSecurityTrustHtml(desc);
  }

  navigateToProjects() {
    this.router.navigate(['/projects']);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  goToPreviousProject() {
    // console.log('Navigating to previous project');
    const index = this.projects.findIndex((project: Project) => project?.id === this.project?.id);
    if (index !== 0) {
      this.router.navigate([`/projects/${this.projects[index - 1].id}`], { replaceUrl: true }).then(() => {
        window.location.reload();
      });
    } 
  }

  goToNextProject() {
    // console.log('Navigating to next project');
    const index = this.projects.findIndex((project: Project) => project?.id === this.project?.id);
    if (index !== this.projects.length - 1) {
      this.router.navigate([`/projects/${this.projects[index + 1].id}`], { replaceUrl: true }).then(() => {
        window.location.reload();
      });
    }
  }
}
