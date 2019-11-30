import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[file-selection-host]',
})
export class FileSelectionDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}