import { HostBinding } from '@angular/core';
import { HostListener } from '@angular/core';
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'green');
    this.borderColor = 'orange';
  }

  @HostBinding('style.borderColor') borderColor: string = 'black';

  constructor(
    private elRef: ElementRef, // Host element
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    // Better way to access the DOM (Document Objet Model)
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.renderer.setStyle(this.elRef.nativeElement, 'border', '2px dashed pink');
  }
}
