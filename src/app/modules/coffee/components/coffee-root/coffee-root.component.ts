import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coffee-root',
  templateUrl: './coffee-root.component.html',
  styleUrls: ['./coffee-root.component.scss']
})
export class CoffeeRootComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onPurchaseCoffee() {
    // Call Stripe API
  }

}
