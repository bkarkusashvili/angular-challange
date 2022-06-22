import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Output('clickOutside') clickOutside = new EventEmitter<MouseEvent>();

  constructor(private ref: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target'])
  onDocumentClicked(event: MouseEvent, targetElement: HTMLElement) {
    if (
      targetElement &&
      document.body.contains(targetElement) &&
      !this.ref.nativeElement.contains(targetElement)
    ) {
      this.clickOutside.emit(event);
    }
  }
}
