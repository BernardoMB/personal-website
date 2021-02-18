import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import Typed, { TypedOptions } from 'typed.js';

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

  //#region TypedJS
  typed: any;
  showElement1 = false;
  showElement2 = false;
  showElement3 = false;
  //#endregion 

  //#region Particles
  id = 'tsparticles';
  particlesOptions = {
    "interactivity": {
      "events": {
        "onHover": {
          "enable": true,
          "mode": "repulse"
        }
      },
      "modes": {
        "bubble": {
          "distance": 400,
          "duration": 2,
          "opacity": 0.8,
          "size": 30
        },
        "grab": {
          "distance": 400
        }
      }
    },
    "particles": {
      "color": {
        "value": "#ffffff"
      },
      "move": {
        "attract": {
          "rotate": {
            "x": 600,
            "y": 1200
          }
        },
        "enable": true
      },
      "number": {
        "value": 80
      },
      "opacity": {
        "random": true,
        "value": 0.5,
        "animation": {
          "enable": true,
          "minimumValue": 0.1,
          "speed": 3
        }
      },
      "size": {
        "random": true,
        "value": 10,
        "animation": {
          "minimumValue": 0.1,
          "speed": 20
        }
      },
      "stroke": {
        "color": {
          "value": "#000000",
          "animation": {
            "enable": false,
            "speed": 1,
            "sync": true
          }
        }
      }
    }
  }
  //#endregion

  constructor() { }

  ngOnInit(): void {
    const options0: TypedOptions = {
      strings: [
        'Be yourself; everyone else is already taken.'
      ],
      typeSpeed: 30,
      /* backSpeed: 50,
      showCursor: true,
      cursorChar: '|',
      loop: false */
      cursorChar: '_',
      backDelay: 750,
      loop: false,
      loopCount: 0,
      onComplete: function(self) { (<any>self).cursor.remove() }
    };
    if (!!this.typed) this.typed.destroy();
    this.typed = new Typed('.typed-element-0', options0);

    setTimeout(() => {
      this.showElement1 = true;
    }, 3000);

    setTimeout(() => {
      this.showElement2 = true;
      setTimeout(() => {
        const options2: TypedOptions = {
          strings: [
            'Oscar Wilde'
          ],
          typeSpeed: 30,
          /* backSpeed: 50,
          showCursor: true,
          cursorChar: '|',
          loop: false */
          cursorChar: '_',
          backDelay: 750,
          loop: false,
          loopCount: 0
        };
        /* if (!!this.typed) this.typed.destroy(); */
        this.typed = new Typed('.typed-element-2', options2);
      }, 1);
    }, 4000);
  }

}
