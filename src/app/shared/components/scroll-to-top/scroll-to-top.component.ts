import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out', style({ height: 40, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 40, opacity: 1 }),
            animate('1s ease-in', style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ScrollToTopComponent implements OnInit {
  windowScrolled: boolean | undefined;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll', [])
  checkScroll() {
    this.windowScrolled = window.pageYOffset >= 250;
  }

  scrollToTop() {
    /* (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      console.log(currentScroll);
      if (currentScroll > 0) {
        console.log('scrolling');
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })(); */
    window.scrollTo(0, 0);
  }

  ngOnInit() {
  }

}
