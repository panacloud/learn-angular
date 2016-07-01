import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {
  getHeroes() {
    return ["Zeeshan", "Taha", "Rehan", "Inam", "Hira"];
  }
}
