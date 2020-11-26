import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  nameFooter = 'Bernardo Mondragón Brozon';
  titleFooter = 'Actuary & Full-Satck Developer';
  phoneNumberFooter = '55 3559 2033';
  emailAddressFooter = 'bmondragonbrozon@gmail.com';
  physicalAddressFooter = 'Paseo San Agustin 78, Lomas Verdes, Naucalpan, Edo. Mex., 53120';

  constructor() { }

  ngOnInit(): void {
  }

  onShowInfo(info: string): void {
    alert(info);
  }

}
