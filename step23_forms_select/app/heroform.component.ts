import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { Hero }    from './hero';
@Component({
  selector: 'hero-form',
  template: `<div>
    <h1>Hero Form</h1>
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="power">Hero Names</label>
        <select class="form-control" required [(ngModel)]="model.name" name="name">
          <option *ngFor="let n of names" [value]="n">{{n}}</option>
        </select>
</div>
      <button type="submit">Submit</button>
    </form>
</div>
`
})
export class HeroFormComponent {
  names = ['Zeeshan', 'Rehan',
            'Hira', 'Taha'];
  
  model = new Hero(18, this.names[0]);
  submitted = false;
  onSubmit() { 
      console.log("form submited:" + JSON.stringify(this.model));
      this.submitted = true; 
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
