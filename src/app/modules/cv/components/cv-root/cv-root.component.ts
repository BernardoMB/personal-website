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
