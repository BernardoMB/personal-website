import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: '[basicHightlight]' // Distinguish directive
})
export class BasicHightlightDirective implements OnInit {
  constructor(
    private elementRef: ElementRef // Access to the element this directive sits on
  ) {

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }

}
