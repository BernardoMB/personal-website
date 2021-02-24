import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService, LoaderState } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loadingbar',
  templateUrl: './loadingbar.component.html',
  styleUrls: ['./loadingbar.component.scss']
})
export class LoadingbarComponent implements OnInit {
  show = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loaderState.subscribe((state: LoaderState) => {
      console.log('New value emmited');
      this.show = state.show;
    });
  }
}
