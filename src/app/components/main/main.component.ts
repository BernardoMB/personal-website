import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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

  constructor(
    @Inject(DOCUMENT) private document: any,
    private contactService: ContactService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
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

}
