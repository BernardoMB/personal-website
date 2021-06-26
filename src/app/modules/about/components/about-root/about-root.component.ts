import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-root',
  templateUrl: './about-root.component.html',
  styleUrls: ['./about-root.component.scss'],
})
export class AboutRootComponent implements OnInit {
  //#region Particles
  id = 'tsparticles2';
  particlesOptions2 = {
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 30,
        },
        grab: {
          distance: 400,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff',
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
      },
      number: {
        value: 80,
      },
      opacity: {
        random: true,
        value: 0.5,
        animation: {
          enable: true,
          minimumValue: 0.1,
          speed: 3,
        },
      },
      size: {
        random: true,
        value: 10,
        animation: {
          minimumValue: 0.1,
          speed: 20,
        },
      },
      stroke: {
        color: {
          value: '#000000',
          animation: {
            enable: false,
            speed: 1,
            sync: true,
          },
        },
      },
    },
  };
  //#endregion

  constructor(private router: Router) {}

  ngOnInit(): void {
  }
}
