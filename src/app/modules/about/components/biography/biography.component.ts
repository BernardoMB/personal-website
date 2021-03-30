import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {
  readTime = 5 * 60 * 1000; // 5 minutes

  constructor() { }

  ngOnInit(): void {
  }

}
