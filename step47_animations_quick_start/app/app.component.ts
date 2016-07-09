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
          @heroState="hero.state"
          (click)="hero.toogleState()">
        {{hero.name}}
      </li>
    </ul>
  `,

  styles: [`
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
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
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.2)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class AppComponent {
  heroes: Hero[];

  constructor(){
    this.heroes = [
      new Hero(11, 'Mr. Zeeshan', "inactive"),
      new Hero(12, 'Miss Hira', "inactive"),
      new Hero(13, 'Mr. Inam', "inactive"),
      new Hero(14, 'Mr. Taha', "inactive"),
      new Hero(15, 'Mr. Rehan', "inactive"),
    ];
  }

  
}
