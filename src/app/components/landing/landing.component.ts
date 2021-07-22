import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { skip, take } from 'rxjs/operators';
import Typed, { TypedOptions } from 'typed.js';
import { ContactService } from '../../services/contact.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  currentLang;
  phrase: string | undefined;

  //#region Swiper
  index = 0;
  config: SwiperConfigInterface = {
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
      clickable: true
    },
  };
  //#endregion

  //#region TypedJS
  typed1: any;
  typed2: any;
  typed3: any;
  showElement0 = true;
  showElement1 = false;
  showElement2 = false;
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

  //#region Skills
  skills = [
    { name: 'JavaScript/TypeScript', completion: 95, label: 'Experienced'},
    { name: 'C#', completion: 80, label: 'Experienced'},
    { name: 'HTML/CSS', completion: 90, label: 'Experienced'},
    { name: 'R', completion: 80, label: 'Experienced'},
    { name: 'Java', completion: 75, label: 'Experienced'},
    { name: 'SQL', completion: 70, label: 'Experienced'},
    { name: 'MongoDB', completion: 85, label: 'Experienced'},
    { name: 'Azure', completion: 75, label: 'Experienced'},
    { name: 'AWS', completion: 65, label: 'Intermediate'},
    { name: 'Visual Basic', completion: 40, label: 'Beginner'},
    { name: 'Microsoft Excel', completion: 75, label: 'Experienced'},
    { name: 'LaTex', completion: 80, label: 'Experienced'},
    { name: 'MatLab', completion: 40, label: 'Beginner'},
  ];
  //#endregion

  //#region Contact form
  contactForm = new FormGroup({
    toggleControl: new FormControl('whatsapp', [Validators.required]),
    nameControl: new FormControl('', [Validators.required]),
    emailControl: new FormControl('', [Validators.email, /*(control: AbstractControl): {[key: string]: any} | null => {
      const regularExpresion = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      const match = regularExpresion.test(control.value);
      if (!match) {
        return { noMatchRegex: { errorMessage: 'Must enter a valid email address.' } };
      }
      return null;
    }*/]),
    messageControl: new FormControl('', [Validators.required, Validators.minLength(10)])
  });
  isSendEmail = false;
  //#endregion

  constructor(
    private contactService: ContactService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    public translateService: TranslateService
  ) {
    //#region Translate
    this.currentLang = this.translateService.currentLang;
    switch(this.currentLang) {
      case 'en':
        this.phrase = 'Be yourself; everyone else is already taken.';
        break;
      case 'es':
        this.phrase = 'Se tu mismo; los demás ya estan ocupados.';
        break;
      default:
        this.phrase = 'Be yourself; everyone else is already taken.';
        break;
    }
    //#endregion
  }

  ngOnInit(): void {
    //#region Translate
    this.translateService.onLangChange.pipe(
      skip(1)
    ).subscribe((event: any) => {
      this.currentLang = event.lang;
      switch(this.currentLang) {
        case 'en':
          this.phrase = 'Be yourself; everyone else is already taken.';
          break;
        case 'es':
          this.phrase = 'Se tu mismo; los demás ya estan ocupados.';
          break;
        default:
          this.phrase = 'Be yourself; everyone else is already taken.';
          break;
      }
      this.showElement0 = false;
      this.showElement1 = false;
      this.showElement2 = false;
      this.type();
    });
    //#endregion
    //#region Contact form
    this.contactForm.controls.toggleControl.valueChanges.subscribe((value: string) => {
      switch (value) {
        case 'whatsapp':
          this.isSendEmail = false;
          break;
        case 'email':
          this.isSendEmail = true;
          break;
        default:
          this.isSendEmail = false;
          break;
      }
    });
    //#endregion
    //#region Skills
    this.skills = this.skills.sort((a, b) => b.completion - a.completion);
    //#endregion
  }

  ngAfterViewInit() {
    this.type();
  }

  type() {
    //#region Typed JS
    this.showElement0 = true;
    const options0: TypedOptions = {
      strings: [
        this.phrase?? ''
      ],
      typeSpeed: 30,
      cursorChar: '_',
      backDelay: 750,
      loop: false,
      loopCount: 0,
      onComplete: function(self) {
        (<any>self).cursor.remove();
      }
    };
    if (!!this.typed1) this.typed1.destroy();
    this.typed1 = new Typed('.typed-element-0', options0);

    setTimeout(() => {
      this.showElement1 = true;
      setTimeout(() => {
        const options1: TypedOptions = {
          strings: [
            ' '
          ],
          typeSpeed: 30,
          cursorChar: '_',
          backDelay: 750,
          loop: false,
          loopCount: 0,
          onComplete: function(self) {
            setTimeout(() => {
              (<any>self).cursor.remove()
            }, 1500);
          }
        };
        var typedElement1 = document.getElementsByClassName('typed-element-1')[0];
        if (typedElement1 != null) {
          this.typed2 = new Typed('.typed-element-1', options1);
        }
      }, 1);
    }, 2500);

    setTimeout(() => {
      this.showElement2 = true;
      setTimeout(() => {
        const options2: TypedOptions = {
          strings: [
            'Oscar Wilde'
          ],
          typeSpeed: 30,
          cursorChar: '_',
          backDelay: 750,
          loop: false,
          loopCount: 0
        };
        var typedElement2 = document.getElementsByClassName('typed-element-2')[0];
        if (typedElement2 != null) {
          this.typed3 = new Typed('.typed-element-2', options2);
        }
      }, 1);
    }, 4000);
    //#endregion
  }

  //#region Contact form
  submitContactForm() {
    if (!this.isSendEmail) {
      // Send whatsapp
      if (
        this.contactForm.controls.nameControl.valid &&
        this.contactForm.controls.messageControl.valid
      ) {
        const name = this.contactForm.controls.nameControl.value;
        const message = this.contactForm.controls.messageControl.value;
        const phoneNumber = '5215535592033';
        const whatsAppMessage = `Hola soy ${name}. ${message}`;
        const encoded = encodeURIComponent(whatsAppMessage);
        window.open(`https://wa.me/${phoneNumber}?text=${encoded}`);

      } else {
        const message = 'Submitted form is invalid.';
        const options = ['Ok'];
        this.dialogService.openDialog(message, options).subscribe((result: string) => {});
        this.contactForm.reset();
        this.contactForm.controls.toggleControl.setValue('email');
        Object.keys(this.contactForm.controls).forEach((key) => {
          this.contactForm.controls[`${key}`].setErrors(null);
        });
      }
    } else {
      // Send email
      if (
        this.contactForm.controls.nameControl.valid &&
        this.contactForm.controls.messageControl.valid &&
        this.contactForm.controls.emailControl.valid
      ) {
        const name = this.contactForm.controls.nameControl.value;
        const email = this.contactForm.controls.emailControl.value;
        const message = this.contactForm.controls.messageControl.value;
        this.contactService.sendEmail(name, email ,message).subscribe((response) => {
          const msg = 'Thank you for your message.';
          const options = ['Ok'];
          this.contactForm.reset();
          this.contactForm.controls.toggleControl.setValue('email');
          Object.keys(this.contactForm.controls).forEach((key) => {
            this.contactForm.controls[`${key}`].setErrors(null);
          });
          this.dialogService.openDialog(msg, []).subscribe((result: string) => {});
        });
      } else {
        const message = 'Submitted form is invalid.';
        const options = ['Ok'];
        this.dialogService.openDialog(message, options).subscribe((result: string) => {});
      }
    }
  }
  //#endregion

  navigateLink(link : string) {
    window.open(link, '_blank');
  }
}
