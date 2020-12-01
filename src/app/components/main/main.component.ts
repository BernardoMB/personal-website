import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  opened: boolean | undefined;
  initials = 'BMB';

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
  }

  onOpenedStart(): void {
    this.document.body.classList.add('no-scroll');
  }

  onClosedStart(): void {
    this.document.body.classList.remove('no-scroll');
  }

}
