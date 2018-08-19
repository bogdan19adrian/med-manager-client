import { Directive } from '@angular/core';

@Directive({
  selector: '[appHideIfUnauthorized]'
})
export class HideIfUnauthorizedDirective {

  constructor() { }

}
