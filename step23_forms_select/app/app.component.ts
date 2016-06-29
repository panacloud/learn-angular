import { Component }         from '@angular/core';
import { HeroFormComponent } from './heroform.component';

@Component({
  selector: 'my-app',
  template: '<hero-form></hero-form>',
  directives: [HeroFormComponent]
})
export class AppComponent { }
