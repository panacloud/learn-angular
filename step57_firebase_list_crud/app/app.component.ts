import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'my-app',
  template: `
  <ul>
    <li *ngFor="let item of items | async">
      <input type="text" #update [value]="item.text" />
      <button (click)="update(item.$key, update.value)">Update</button>
      <button (click)="deleteItem(item.$key)">Delete</button>
    </li>
  </ul>
  <input type="text" #newitem />
  <button (click)="add(newitem.value)">Add</button>
  <button (click)="deleteEverything()">Delete All</button>
  `,
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/messages');
  }
  add(newName: string) {
    this.items.push({ text: newName });
  }
  update(key: string, name: string) {
    this.items.update(key, { name: name });
  }
  deleteItem(key: string) {    
    this.items.remove(key); 
  }
  deleteEverything() {
    this.items.remove();
  }
}
