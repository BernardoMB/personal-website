import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hobbie } from '../../interfaces/hobbie';

@Component({
  selector: 'app-hobbies-root',
  templateUrl: './hobbies-root.component.html',
  styleUrls: ['./hobbies-root.component.scss']
})
export class HobbiesRootComponent implements OnInit {
  hobbies: Array<Hobbie> = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      // console.log('Resolved data', data);
      if (data.hobbiesInfo) {
        this.hobbies = data.hobbiesInfo;
      }
    });
  }

}
