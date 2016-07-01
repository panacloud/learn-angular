import { Component } from '@angular/core';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-app',
  template: `<h1>My Heros</h1>
  <button (click)="onSelected()">Print Name</button>
  {{selected}}
  `,
  providers: [HeroService]
})
export class AppComponent { 
   selected: string;
   constructor(private heroService: HeroService){}

   onSelected(){
    this.selected = this.heroService.getHeroes()[this.randomIntFromInterval(0,4)];
   }

   randomIntFromInterval(min,max)
   {
    return Math.floor(Math.random()*(max-min+1)+min);
   }

   ngOnInit() {
    this.selected = this.heroService.getHeroes()[0];
  }
}
