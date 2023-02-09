import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { skip } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  opened: boolean | undefined;
  initials = 'BMB';
  currentLang: string | undefined;
  //#region Feedback button
  showFeedbackButton = false;
  title: string = "";
  placeholder: string = "";
  editTip: string = "";
  checkboxLabel: string = "";
  cancelLabel: string = "";
  sendLabel: string = "";
  moveToolbarTip: string = "";
  drawRectTip: string = "";
  highlightTip: string = "";
  hideTip: string = "";
  editDoneLabel: string = "";
  //#endregion

  constructor(
    @Inject(DOCUMENT) private document: any,
    private contactService: ContactService,
    private dialogService: DialogService,
    public translateService: TranslateService
  ) { }

  ngOnInit(): void {
    //#region Translations
    this.translateService.onLangChange.pipe(
      skip(0)
    ).subscribe((event: any) => {
      this.showFeedbackButton = false;
      this.currentLang = event.lang;
      switch(this.currentLang) {
        case 'en':
          this.title = "Send feedback";
          this.placeholder = "Describe your issue or share your ideas";
          this.editTip = "Click to highlight or hide info";
          this.checkboxLabel = "Include screenshot";
          this.cancelLabel = "CANCEL";
          this.sendLabel = "SEND";
          this.moveToolbarTip = "Move toolbar";
          this.drawRectTip = "Draw using yellow to highlight issues or black to hide sensitive info";
          this.highlightTip = "	Highlight issues";
          this.hideTip = "Hide sensitive info";
          this.editDoneLabel = "DONE";
          break;
        case 'es':
          this.title = "Enviar retroalimentación";
          this.placeholder = "Describe tu problema o comparte tus ideas";
          this.editTip = "Haz click para resaltar o ocultar información";
          this.checkboxLabel = "Incluye captura de pantalla";
          this.cancelLabel = "CANCELAR";
          this.sendLabel = "ENVIAR";
          this.moveToolbarTip = "Mueve la barra de herramientas";
          this.drawRectTip = "Dibuja usando amarillo para indicar los problemas o negro para ocultar información sensible";
          this.highlightTip = "Resalta los problemas";
          this.hideTip = "Oculta información sensible";
          this.editDoneLabel = "LISTO";
          break;
        default:
          this.title = "Send feedback";
          this.placeholder = "Describe your issue or share your ideas";
          this.editTip = "Click to highlight or hide info";
          this.checkboxLabel = "Include screenshot";
          this.cancelLabel = "CANCEL";
          this.sendLabel = "SEND";
          this.moveToolbarTip = "Move toolbar";
          this.drawRectTip = "Draw using yellow to highlight issues or black to hide sensitive info";
          this.highlightTip = "	Highlight issues";
          this.hideTip = "Hide sensitive info";
          this.editDoneLabel = "DONE";
          break;
      }
      setTimeout(() => {
        this.showFeedbackButton = true;
      }, 5 * 1000);
    });
    //#endregion
  }

  onOpenedStart(): void {
    this.document.body.classList.add('no-scroll');
  }

  onClosedStart(): void {
    this.document.body.classList.remove('no-scroll');
  }

  onSendFeedback(event: any): void {
    // Reactive smooth scrolling for html element.
    // This has to bee done because the Ng feedback dialog requires no smooth scroll bahavior in order to take screen shot.
    this.document.getElementById('html-element').style.scrollBehavior = 'smooth';
    if (event.error) {
      return;
    }
    this.contactService.sendFeedback(event.description, event.screenshot).subscribe((res) => {
      this.dialogService.openDialog('Thank you for your feedback!', ['Ok']).subscribe((result: string) => { });
    });
  }

  /**
   * This funcitino is being called so the Ng feedback can place the right screen shot
   *
   * @memberof MainComponent
   */
  deactivateSmothScrolling() {
    this.document.getElementById('html-element').style.scrollBehavior = 'unset';
  }

  toggleShowFeedbackButton() {
    this.showFeedbackButton = !this.showFeedbackButton;
  }

}
