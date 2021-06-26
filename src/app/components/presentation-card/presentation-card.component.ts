import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-presentation-card',
  templateUrl: './presentation-card.component.html',
  styleUrls: ['./presentation-card.component.scss']
})
export class PresentationCardComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() title: string | undefined;
  @Input() phoneNumber: string | undefined;
  @Input() emailAddress: string | undefined;
  @Input() physicalAddress: string | undefined;
  @Output() showInfo = new EventEmitter<string>();

  constructor(
    //#region Copy to clipboard
    private clipboard: Clipboard
    //#endregion
  ) { }

  ngOnInit(): void {
  }

  emitShowInfoEvent(): void {
    const info = 'This is personal infromation and by no means shall be used for non-legal propuses.';
    this.showInfo.emit(info);
  }

  copyToClipboard(str: string) {
    this.clipboard.copy(str);
  }

  shareOnFacebook() {
    const postUrl = encodeURI(document.location.href);
    window.open(`https://www.facebook.com/sharer.php?u=${postUrl}`);
  }

  shareOnTwitter() {
    const postUrl = encodeURI(document.location.href);
    const text = 'Checkout this awesome website';
    window.open(`https://www.twitter.com/share?url=${postUrl}&text=${text}`);
  }

  shareOnReddit() {
    const postUrl = encodeURI(document.location.href);
    const text = encodeURI('Checkout this awesome website');
    window.open(`http://www.reddit.com/submit?url=${postUrl}&title=${text}`);
  }

}
