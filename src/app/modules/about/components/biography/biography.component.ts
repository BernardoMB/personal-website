import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {
  readTime = 5 * 60 * 1000; // 5 minutes
  yearsOfExperience: number | undefined;
  teachingYears: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.yearsOfExperience = new Date().getFullYear() - 2013;
    this.teachingYears = new Date().getFullYear() - 2019;
  }

}
