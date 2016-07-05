import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import {Subject} from 'rxjs/Subject';
import {DataService} from './data.service';
import {Todo} from './Todo';
import {List} from 'immutable';

@Component({
  selector: 'my-app',
  template: `<div>
    <h1>Item List</h1>
    <ul id="todo-list">
      <li *ngFor="let item of data.todos | async" >
        <span>{{item.item}}</span>
    </li>
</ul>
    <form (ngSubmit)="onSubmit()">
      <div>
        <label for="item">Item</label>
        <input type="text" required
        [(ngModel)]="item.item" name="item">
      </div>
      <button type="submit">Add</button>
    </form>
</div>
  `,
  providers: [DataService]
})
export class AppComponent { 
  item: Todo = new Todo('');
  data: DataService;
  
  constructor(data: DataService){
    this.data = data;
    this.data.todos.subscribe((entry) => console.log(entry));

  }

  onSubmit(){
    //console.log("Item added: " + this.item);
    this.data.addItem(this.item);
    this.item = new Todo('');
  }
}
