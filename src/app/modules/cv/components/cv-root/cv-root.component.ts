import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv-root',
  templateUrl: './cv-root.component.html',
  styleUrls: ['./cv-root.component.scss']
})
export class CvRootComponent implements OnInit {
  showDynamicDisplayContent: boolean = false;

  // NgClass directive example
  isPurple = true;
  isBlue = false;

  constructor() { }

  ngOnInit(): void {
  }

}
