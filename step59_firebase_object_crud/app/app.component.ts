import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'my-app',
  template: `
  <h1>{{ item | async | json }}</h1>
  <input type="text" #newname placeholder="Name" />
  <input type="text" #newsize placeholder="Size" />
  <br />
  <button (click)="save(newname.value)">Set Name</button>
  <button (click)="update(newsize.value)">Update Size</button>
  <button (click)="delete()">Delete</button>
  `,
})
export class AppComponent {
  item: FirebaseObjectObservable<any>;

  constructor(af: AngularFire) {
    this.item = af.database.object('/item');
  }

  save(newName: string) {
    this.item.set({ name: newName });
  }

  update(newSize: string) {
    this.item.update({ size: newSize });
  }
  
  delete() {
    this.item.remove();
  }
}
