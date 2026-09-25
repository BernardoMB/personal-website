import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { skip, take } from 'rxjs/operators';
import Typed, { TypedOptions } from 'typed.js';
import { ContactService } from '../../services/contact.service';
import { DialogService } from '../../services/dialog.service';

export interface SkillDefinition {
  name: string;
  completion: number;
}

export interface SkillGroupDefinition {
  titleKey: string;
  skills: SkillDefinition[];
}

export interface Skill {
  name: string;
  completion: number;
  label: string;
}

export interface SkillGroup {
  titleKey: string;
  skills: Skill[];
}

export const SKILL_GROUP_DEFINITIONS: SkillGroupDefinition[] = [
  {
    titleKey: 'LANDING.SKILLS_GROUP_AI',
    skills: [
      { name: 'Python', completion: 95 },
      { name: 'Agentic Development', completion: 90 },
      { name: 'OpenAI API / Anthropic Claude API', completion: 88 },
      { name: 'RAG', completion: 85 },
      { name: 'LangChain / LangGraph', completion: 82 },
      { name: 'OpenAI Function Calling / MCP', completion: 80 },
      { name: 'AutoGen / CrewAI', completion: 72 },
      { name: 'TensorFlow / PyTorch', completion: 68 },
      { name: 'Diffusion models / Generative Agents', completion: 58 },
      { name: 'Unreal Engine for AI', completion: 45 },
    ]
  },
  {
    titleKey: 'LANDING.SKILLS_GROUP_INFRA',
    skills: [
      { name: 'Docker', completion: 90 },
      { name: 'CI/CD pipelines', completion: 88 },
      { name: 'Kubernetes (K8s)', completion: 78 },
      { name: 'Vertex AI / Azure ML / AWS SageMaker', completion: 75 },
      { name: 'Kafka / Pub/Sub / RabbitMQ', completion: 70 },
      { name: 'Prometheus / Grafana', completion: 65 },
      { name: 'Terraform / Pulumi', completion: 62 },
      { name: 'vLLM / Triton', completion: 58 },
      { name: 'Distributed training frameworks', completion: 55 },
      { name: 'CUDA / NVIDIA Triton Inference Server', completion: 50 },
    ]
  },
  {
    titleKey: 'LANDING.SKILLS_GROUP_FULLSTACK',
    skills: [
      { name: 'SQL + NoSQL + Redis', completion: 90 },
      { name: 'Next.js / React', completion: 88 },
      { name: 'Unit + Integration Testing', completion: 85 },
      { name: 'FastAPI / Flask', completion: 82 },
      { name: 'OAuth2 / JWT', completion: 78 },
      { name: 'Data pipelines', completion: 75 },
      { name: 'GraphQL', completion: 72 },
      { name: 'Playwright / Cypress', completion: 68 },
      { name: 'ETL tools', completion: 62 },
      { name: 'Snowflake / BigQuery', completion: 52 },
    ]
  },
];

export function labelForCompletion(completion: number, labels: string[]): string {
  if (completion >= 70) {
    return labels[0];
  }
  if (completion >= 55) {
    return labels[1];
  }
  return labels[2];
}

export function buildSkillGroups(labels: string[]): SkillGroup[] {
  return SKILL_GROUP_DEFINITIONS.map((group) => ({
    titleKey: group.titleKey,
    skills: group.skills
      .map((skill) => ({
        name: skill.name,
        completion: skill.completion,
        label: labelForCompletion(skill.completion, labels)
      }))
      .sort((a, b) => b.completion - a.completion)
  }));
}

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
      delay: 13.5 * 1000,
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
  quoteEnglish = 'Look at everything always as though you were seeing it either for the first or last time: Thus is your time on earth filled with glory.';
  quoteSpanish = 'Observa todo como si fuera la primera o la última vez: entonces tu vida estará llena de gloria';
  quoteAuthor = 'Betty Smith';
  quoteTime = 7500; // 7.5 seconds
  authorTime = 10 * 1000; // 10 seconds
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
  skillGroups: SkillGroup[] | undefined;
  labels: Array<string> | undefined;
  //#endregion

  //#region Contact form
  showSendWhatsAppForm = true;
  showSendEmailForm = false;
  toggleControl = new FormControl('whatsapp', [Validators.required]);
  sendWhatsAppForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    messageControl: new FormControl('', [Validators.required, Validators.minLength(10)])
  });
  sendEmailForm = new FormGroup({
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
  graceFullMessage = 'Thank you for your message.';
  invalidFormErrorMessage = 'Submitted form is invalid.';
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
        this.phrase = this.quoteEnglish;
        break;
      case 'es':
        this.phrase = this.quoteSpanish;
        break;
      default:
        this.phrase = this.quoteEnglish;
        break;
    }
    //#endregion
  }

  ngOnInit(): void {
    //#region Translate
    this.translateService.onLangChange.pipe(
      skip(1)
    ).subscribe((event: any) => {
      //#region Adjust phrase
      this.currentLang = event.lang;
      switch(this.currentLang) {
        case 'en':
          this.phrase = this.quoteEnglish;
          break;
        case 'es':
          this.phrase = this.quoteSpanish;
          break;
        default:
          this.phrase = this.quoteEnglish;
          break;
      }
      this.showElement0 = false;
      this.showElement1 = false;
      this.showElement2 = false;
      this.type();
      //#endregion
      //#region Adjust skills
      switch(this.currentLang) {
        case 'en':
          this.labels = ['Experienced', 'Intermediate', 'Beginner'];
          this.graceFullMessage = 'Thank you for your message.';
          this.invalidFormErrorMessage = 'Submitted form is invalid.';
          break;
        case 'es':
          this.labels = ['Experimentado', 'Intermedio', 'Pricipiante'];
          this.graceFullMessage = 'Gracias por tu mensaje.';
          this.invalidFormErrorMessage = 'El formulario es inválido.';
          break;
        default:
          this.labels = ['Experienced', 'Intermediate', 'Beginner'];
          this.graceFullMessage = 'Thank you for your message.';
          this.invalidFormErrorMessage = 'Submitted form is invalid.';
          break;
      }
      this.skillGroups = buildSkillGroups(this.labels);
      //#endregion
    });
    //#endregion
    switch(this.currentLang) {
      case 'en':
        this.labels = ['Experienced', 'Intermediate', 'Beginner'];
        this.graceFullMessage = 'Thank you for your message.';
        this.invalidFormErrorMessage = 'Submitted form is invalid.';
        break;
      case 'es':
        this.labels = ['Experimentado', 'Intermedio', 'Pricipiante'];
        this.graceFullMessage = 'Gracias por tu mensaje.';
        this.invalidFormErrorMessage = 'El formulario es inválido.';
        break;
      default:
        this.labels = ['Experienced', 'Intermediate', 'Beginner'];
        this.graceFullMessage = 'Thank you for your message.';
        this.invalidFormErrorMessage = 'Submitted form is invalid.';
        break;
    }
    this.skillGroups = buildSkillGroups(this.labels);
    //#region Contact form
    this.toggleControl.valueChanges.subscribe((value: string) => {
      switch (value) {
        case 'whatsapp':
          this.showSendWhatsAppForm = true;
          this.showSendEmailForm = false;
          this.isSendEmail = false;
          break;
        case 'email':
          this.showSendWhatsAppForm = false;
          this.showSendEmailForm = true;
          this.isSendEmail = true;
          break;
        default:
          this.showSendWhatsAppForm = true;
          this.showSendEmailForm = false;
          this.isSendEmail = false;
          break;
      }
    });
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
    }, this.quoteTime);

    setTimeout(() => {
      this.showElement2 = true;
      setTimeout(() => {
        const options2: TypedOptions = {
          strings: [
            this.quoteAuthor
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
    }, this.authorTime);
    //#endregion
  }

  //#region Contact form
  submitWhatsAppForm(formDirective: FormGroupDirective) {
    if (
      this.sendWhatsAppForm.controls.nameControl.valid &&
      this.sendWhatsAppForm.controls.messageControl.valid
    ) {
      const name = this.sendWhatsAppForm.controls.nameControl.value;
      const message = this.sendWhatsAppForm.controls.messageControl.value;
      const phoneNumber = '15716261227';
      const whatsAppMessage = `Hola soy ${name}. ${message}`;
      const encoded = encodeURIComponent(whatsAppMessage);
      window.open(`https://wa.me/${phoneNumber}?text=${encoded}`);
      formDirective.resetForm();
      this.sendWhatsAppForm.reset();
    } else {
      const message = this.invalidFormErrorMessage;
      const options = ['Ok'];
      this.dialogService.openDialog(message, options).subscribe((result: string) => {});
      //this.sendWhatsAppForm.reset();
      // Object.keys(this.sendWhatsAppForm.controls).forEach((key) => {
      //   this.sendWhatsAppForm.controls[`${key}`].setErrors(null);
      // });
    }
  }

  submitEmailForm(formDirective: FormGroupDirective) {
    if (
      this.sendEmailForm.controls.nameControl.valid &&
      this.sendEmailForm.controls.messageControl.valid &&
      this.sendEmailForm.controls.emailControl.valid
    ) {
      const name = this.sendEmailForm.controls.nameControl.value;
      const email = this.sendEmailForm.controls.emailControl.value;
      const message = this.sendEmailForm.controls.messageControl.value;
      this.contactService.sendEmail(name, email ,message).subscribe((response) => {
        const msg = this.graceFullMessage;
        const options = ['Ok'];
        formDirective.resetForm();
        this.sendEmailForm.reset();
        // Object.keys(this.sendEmailForm.controls).forEach((key) => {
        //   this.sendEmailForm.controls[`${key}`].setErrors(null);
        // });
        this.dialogService.openDialog(msg, []).subscribe((result: string) => {});
      });
    } else {
      const message = this.invalidFormErrorMessage;
      const options = ['Ok'];
      this.dialogService.openDialog(message, options).subscribe((result: string) => {});
    }
  }
  //#endregion

  navigateLink(link : string) {
    window.open(link, '_blank');
  }
}
