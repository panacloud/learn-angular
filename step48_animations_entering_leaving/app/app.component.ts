import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <ul class="heroes">
      <li *ngFor="let hero of heroes"
          @flyInOut="hero.state"
          (click)="deleteHero(hero)">
        {{hero.name}}
      </li>
    </ul>
    <form (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Name</label>
        <input type="text" required
        [(ngModel)]="model.name" name="name">
      </div>
      <button type="submit">Submit</button>
    </form>
  `,

  styles: [`
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  
`],
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(100)
    ]),
    transition('* => void', [
      animate(100, style({transform: 'translateX(100%)'}))
    ])
  ])
]

})
export class AppComponent {
  heroes: Hero[];
  model = new Hero('');

  constructor(){
    this.heroes = [
      new Hero('Mr. Zeeshan'),
      new Hero('Miss Hira'),
      new Hero('Mr. Inam'),
      new Hero('Mr. Taha'),
      new Hero('Mr. Rehan')
    ];
  }

  onSubmit() { 
      console.log("form submited:" + JSON.stringify(this.model));
      this.heroes.push(this.model);
      this.model = new Hero('');
  }

  deleteHero(hero: Hero){
    this.heroes.forEach((ele, index) => {
      if(ele.name === hero.name){
          this.heroes.splice(index, 1);
          console.log(index);
          console.log(this.heroes.length);
      }
    })
    
  }

  
}
