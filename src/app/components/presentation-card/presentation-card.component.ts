import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  emitShowInfoEvent(): void {
    const info = 'This is personal infromation and by no means shall be used for non-legal propuses.';
    this.showInfo.emit(info);
  }

}
