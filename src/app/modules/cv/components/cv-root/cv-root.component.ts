import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-cv-root',
  templateUrl: './cv-root.component.html',
  styleUrls: ['./cv-root.component.scss']
})
export class CvRootComponent implements OnInit {
  showDynamicDisplayContent: boolean = false;
  name = 'Bernardo Mondragon Brozon';
  date = moment().format('MM/DD/YYYY');

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
        'Succesfully developed and implemented software solutions to manipulate and analyse data generated by the telecommunication industry for Mexico\'s Attorney-General\'s Office (PGR) and Mexico\'s Center of Investigation and Nation Security (CISEN).',
        'Helped saving hundreds of lives and preventing thousands of crimes.',
        'Succesfully parsed over 700 million CDR (call detail registries) from different random formats.'
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

  constructor() { }

  ngOnInit(): void {
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

}
