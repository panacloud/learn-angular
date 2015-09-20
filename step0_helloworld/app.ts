/// <reference path="typings/tsd.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'my-app'
})
@View({
  template: '<h1>Hello {{ name }}</h1>'
})
class MyAppComponent {
  name: string;
  
  constructor() {
    this.name = 'Panacloud';
  }
}

bootstrap(MyAppComponent);