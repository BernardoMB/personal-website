import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() initials: string | undefined;
  @Output() sideBarNavigation: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}