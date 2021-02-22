import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cool-border',
  templateUrl: './cool-border.component.html',
  styleUrls: ['./cool-border.component.scss']
})
export class CoolBorderComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() description: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
