import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public name = 'Bernardo Mondragón Brozon';
  public title = 'Actuary & Full-Stack Developer';
  public initials = 'BMB';
  public enableShareButton = true;

  constructor() {
    // Code executes on component initialization
    console.log('Executing constructor');
  }

  ngOnInit(): void {
    // Code executes after component has been initialized
    console.log('Executing ngOnInit hook');
  }

  public openNavigationMenu(phrase: string, numero: number): { frase: string, numero: number } {
    console.log(phrase, numero);
    return { frase: phrase, numero };
  }

}
