import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import Typed from 'typed.js';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  index = 0;
  config: SwiperConfigInterface = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  };
  typed: any;

  constructor() { }

  ngOnInit(): void {
    const options = {
      strings: [
        'Be yourself; everyone else is already taken.'
      ],
      typeSpeed: 100,
      backSpeed: 50,
      showCursor: true,
      cursorChar: '|',
      loop: false
    };
    if (!!this.typed) this.typed.destroy();
    this.typed = new Typed('.typed-element', options);
  }

}
