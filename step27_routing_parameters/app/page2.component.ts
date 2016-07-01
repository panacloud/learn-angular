import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page2',
  template: `<h1>Page 2 of Angular 2 App</h1>
  <div>The id is {{id}}</div>
  <div>The id is {{id_static}}, accessed through static api</div>
  `
})
export class Page2Component { 

  private sub: any;
  id: number;
  id_static: any;

  constructor(
  private route: ActivatedRoute,
  private router: Router) {}

  ngOnInit() {
    //Option 1
    //Stick with the this observable params approach if there's even a chance that we might navigate to this component multiple times in a row. 
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    //Option 2
    this.id_static = this.route.snapshot.params['id'];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}