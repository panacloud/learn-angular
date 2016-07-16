import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'my-app',
  template: `
  <h1>{{ (item | async)?.name }}</h1>
  `,
})
export class AppComponent {
  item: FirebaseObjectObservable<any>;
  constructor(af: AngularFire) {
    this.item = af.database.object('/item');
    //this.add("hello Pakitan");
  }

  add(value: string){
    this.item.set({name: value}); 

  }
}

