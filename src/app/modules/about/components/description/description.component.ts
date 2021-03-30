import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  readTime = 2 * 60 * 1000; // 2 minutes

  constructor() { }

  ngOnInit(): void {
  }

}
