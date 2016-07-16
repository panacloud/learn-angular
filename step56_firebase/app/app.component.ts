import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'my-app',
  template: `<h1>My First Angular 2 App</h1>
    <ul>
    <li class="text" *ngFor="let item of items | async">
      {{item.$value}}
  </li>
</ul>
  `
})
export class AppComponent { 
  af: AngularFire;
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.af = af;
    this.items = af.database.list('items');
    
  }

}

