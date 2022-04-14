import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as html2canvas from 'html2canvas';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { single } from './data';

@Component({
  selector: 'app-cv-root',
  templateUrl: './cv-root.component.html',
  styleUrls: ['./cv-root.component.scss']
})
export class CvRootComponent implements OnInit {
  showDynamicDisplayContent: boolean = false;
  name = 'Bernardo Mondragon Brozon';
  date = moment().format('MM/DD/YYYY');
  routeFragmentSubscription: Subscription | undefined;
  selectedTabIndex: number | undefined;

  //#region CV Tab content
  schools = [
    {
      logoUrl: '../../../../../assets/images/logos/logo-itam-green-2.png',
      position: 'Bachelor\'s in Actuarial Science',
      company: 'Institutlo Technológico Autónomo de México (ITAM)',
      employmentType: '',
      startDate: '2013-08-01T00:00:00.000Z',
      endDate: '2018-12-20T00:00:00.000Z',
      location: 'Mexico City, Mexico',
      description: `
        <p>Applied mathematics and statistical methods to assess risk in insurance, finance and other industries and professions.</p>
        <p>More generally, actuaries apply rigorous mathematics to model matters of uncertainty.</p>
      `
    },
    {
      logoUrl: '',
      position: 'Diplomat in Insurance Theory',
      company: 'Institutlo Technológico Autónomo de México (ITAM)',
      employmentType: '',
      startDate: '2021-10-01T00:00:00.000Z',
      endDate: null,
      location: 'Mexico City, Mexico',
      description: `
        <p>Insurance theory: insurance practice, legal framework, all types of insurance and coverages. </p>
        <p>Pricing and reserving</p>
        <p>Solvency II</p>
      `
    },
    {
      logoUrl: '../../../../../assets/images/logos/logo-unam-gold.png',
      position: 'Diploma of Education, Solvency II',
      company: 'Universidad Nacinoal Autónoma de México (UNAM)',
      employmentType: '',
      startDate: '2020-10-01T00:00:00.000Z',
      endDate: '2021-01-01T00:00:00.000Z',
      location: 'Mexico City, Mexico',
      description: `
        <p>Risk assessment under Solvency II framework.</p>
        <p>Solvency II in Mexico's legal framework.</p>
      `
    },
  ];
  experiences = [
    {
      logoUrl: '../../../../../assets/images/logos/Zurich.PNG',
      position: 'Full-stack Developer',
      company: 'Zurich Insurance Company Ltd',
      employmentType: 'Full-time',
      startDate: '2020-11-01T00:00:00.000Z',
      endDate: null,
      location: 'Mexico City, Mexico',
      description: `
        <p>Financial Analysis, Underwriting Automation and Account Management.</p>
        <p>Successfully developed and deployed sureties administration system for Zurich North America.</p>
        <p>Successfully developed and deployed underwriting systems for exporter's property and casualty in North America.</p> 
        <p>Full-stack development and database administration. Brokerage and underwriting automation.</p>
        <p>Technologies used: .Net, Blazor, Entity Framework, SQL Server, Git, Bitbucket, Jira, Jfrog, Redis, Dynatrace Jenkins, Linux VMs, Figma, Microsoft Azure, App Service, and Azure DevOps.</p>

      `
    },
    {
      logoUrl: '../../../../../assets/images/logos/Kalyptio.png',
      position: 'Founding Partner',
      company: 'Kalyptio',
      employmentType: 'Full-time',
      startDate: '2019-01-01T00:00:00.000Z',
      endDate: '2022-01-01T00:00:00.000Z',
      location: 'Mexico City, Mexico',
      description: `
      <p>Design and execute strategic processes to deliver best quality software for our clients.</p>
      <p>I monitor that industry standards are met according to best coding practices.</p>
      <p>I have satisfied over 30+ customers providing them with software that suits their needs</p>
      `
    },
    {
      logoUrl: '',
      position: 'Lead Developer',
      company: 'Neolinx de Mexico',
      employmentType: 'Full-time',
      startDate: '2014-01-01T00:00:00.000Z',
      endDate: '2019-01-01T00:00:00.000Z',
      location: 'Mexico City, Mexico',
      description: `
        <p>Full-stack development</p>
        <p>Successfully developed and implemented software solutions to manipulate and analyze data generated by the telecommunication industry for Mexico's Attorney-General's Office (PGR) and Mexico's Center of Investigation and Nation Security (CISEN).</p>
        <p>Helped saving hundreds of lives and preventing thousands of crimes.</p>
        <p>Successfully parsed over 700 million CDR (call detail registries) from different random formats.</p>
      `
    },
    {
      logoUrl: '../../../../../assets/images/logos/Koomkin.PNG',
      position: 'Full-stack Developer',
      company: 'Grupo Koomkin',
      employmentType: 'Full-time',
      startDate: '2016-08-01T00:00:00.000Z',
      endDate: '2017-02-01T00:00:00.000Z',
      location: 'Mexico City, Mexico',
      description: `
      <p>Analyzed digital marketing campaigns data to maximize lead conversion rates for customers.</p>
          <p>Coded algorithms and designed UI UX flows for lead generation in digital platforms.</p>
          <p>Successfully increased the lead conversion ratio for 40+ clients.</p>
      `
    },
    {
      logoUrl: '../../../../../assets/images/logos/Ecorise.png',
      position: 'Producer',
      company: 'Ecorise Youth Innovations',
      employmentType: 'Full-time',
      startDate: '2016-08-01T00:00:00.000Z',
      endDate: '2017-02-01T00:00:00.000Z',
      location: 'Austin, TX',
      description: `
          <p>Pedagogue, designer, and producer of educational interactive and animated content.</p>
          <p>Animated over 40 educational video lectures for hundreds of students coursing elementary school.</p>
      `
    }
  ];
  //#endregion

  //#region Resume tab

  //#region Html resume
  // NgClass directive example
  isPurple = true;
  isBlue = false;

  // NgStyle directive example
  leftPanelFontColor = 'white';

  // NgFor directive example
  // TODO: Fetch this information from database
  sections = [{
    title: 'Education',
    places: [{
      position: 'Bachelor\'s in Actuarial Science',
      startDate: new Date('08/01/2013'),
      endDate: new Date('08/01/2018'),
      place: 'Instituto Tecnologico Autonomo de Mexico (ITAM)',
      points: [
        'Applied mathematics and statistical methods to assess risk in insurance, finance and other industries and professions.'
      ]
    }]
  }, {
    title: 'Experience',
    places: [{
      position: 'CoFounder & Director',
      startDate: new Date('01/01/2019'),
      endDate: null,
      place: 'Kanto Studio, Mexico City',
      points: [
        'Design and execute strategic processes to deliver best quality software for our clients.',
        'I monitor that industry standards are met according to best coding practices.',
        'I have satisfied over 30+ customers providing them with software that suits their needs.'
      ]
    }, {
      position: 'Full-stack Developer',
      startDate: new Date('01/01/2014'),
      endDate: new Date('01/01/2018'),
      place: 'Neolinx de México SA. de CV., Mexico City',
      points: [
        'Successfully developed and implemented software solutions to manipulate and analyze data generated by the telecommunication industry for Mexico\'s Attorney-General\'s Office (PGR) and Mexico\'s Center of Investigation and Nation Security (CISEN).',
        'Helped saving hundreds of lives and preventing thousands of crimes.',
        'Successfully parsed over 700 million CDR (call detail registries) from different random formats.'
      ]
    }]
  }, {
    title: 'Achivements',
    places: [{
      position: 'Insurance product on IUD failure risk',
      startDate: new Date('05/01/2019'),
      endDate: null,
      place: 'Mexico City',
      points: [
        'Developed a model to asses and manage IUD (Intra Uterus Device) failure risk for an innovative insurance product placement.',
        'Succefully computed risk and market premiums, risk reserves, policy values, risk and utility margins and other actuarial measurements for the product under the Solvency II framework in order for it to be a viable and sustainable insurance product.'
      ]
    }]
  }];
  //#endregion

  //#region Pdf viewer
  pdfSrc = 'assets/CV En plain.pdf';
  //#endregion

  //#endregion

  //#region My Time chart
  single = [];
  view: any = [700, 200];
  // view = undefined;

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#57167e', '#9b3192', '#ea5f89', '#f7b7a3', '#fff1c9']
  };
  //#endregion

  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = event.url.split('#')[1];
        if (fragment) {
          return;
        }
        //window.scrollTo(0, 0);
      }
      return;
    });

    // Set the current tab getting route fragment if any
    this.routeFragmentSubscription = this.route.fragment.subscribe((fragment: string) => {
      if (fragment) {
        switch (fragment) {
          case 'cv':
            this.selectedTabIndex = 0;
            break;
          case 'resume':
            this.selectedTabIndex = 1;
            break;
          case 'activities':
            this.selectedTabIndex = 2;
            break;
          default:
            this.selectedTabIndex = 0;
            break;
        }
      }
    });

    // My Time chart
    Object.assign(this, { single });
  }

  ngOnInit(): void {
  }

  onTabNavigation(tabIndex: number) {
    const fragments = ['cv', 'resume', 'activities'];
    this.router.navigate(['./'], {
      fragment: fragments[tabIndex],
      relativeTo: this.route,
      replaceUrl: false
    });
  }

  changeLeftPanelStyle(color: string): void {
    switch (color) {
      case 'purple':
        this.isPurple = true; this.isBlue = false; this.leftPanelFontColor = 'white';
        break;
      case 'blue':
        this.isPurple = false; this.isBlue = true; this.leftPanelFontColor = 'white';
        break;
      case 'gray':
        this.isPurple = false; this.isBlue = false; this.leftPanelFontColor = 'black';
        break;
      default: // Optional
        // purple case
        this.isPurple = true; this.isBlue = false; this.leftPanelFontColor = 'white';
        break;
    }
  }

  getDuration(startDate: any, endDate: any) {
    const durationEndDate = endDate != null ? endDate : new Date();
    const start = moment(startDate);
    const end = moment(durationEndDate);
    const duration = moment.duration(start.diff(end)).humanize();
    return duration;
  }

  async downloadResume() {
    this.document.getElementById('html-element').style.scrollBehavior = 'unset';
    window.scrollTo(0, 0);
    setTimeout(async () => {
      let element: HTMLElement;
      element = <HTMLElement>(document.querySelector('#document'));
      const canvas = await html2canvas.default(element);
      /* document.body.appendChild(canvas); */
      const contentDataURL = canvas.toDataURL('image/png');
      const download = document.createElement('a');
      download.href = contentDataURL;
      download.download = ``;
      download.click();
      this.document.getElementById('html-element').style.scrollBehavior = 'smooth';
    }, 1);
  }

  async downloadResumeZip() {
    window.open(`/assets/Resume Bernardo Mondragon.zip`);
  }

  //#region My Time
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  //#endregion

}
