import { Directive } from '@angular/core';

@Directive({
  selector: '[appDisableIfUnauthorized]'
})
export class DisableIfUnauthorizedDirective {

  constructor() { }

}
