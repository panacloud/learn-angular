import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { Hero }    from './hero';
@Component({
  selector: 'hero-form',
  template: `<div>
    <h1>Hero Form</h1>
    <form (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Name</label>
        <input type="text" required minlength="5"
        [(ngModel)]="model.name" name="name" #name="ngModel">
        <br><small [hidden]="name.valid || name.pristine">
          Name is required (minimum 5 characters).
        </small>
         <br>TODO: remove this: {{model.name}}
      </div>
      <button type="submit">Submit</button>
    </form>
</div>
`
})
export class HeroFormComponent {
  
  model = new Hero(18, 'Dr Zeeshan');
  submitted = false;
  onSubmit() { 
      console.log("form submited:" + JSON.stringify(this.model));
      this.submitted = true; 
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
