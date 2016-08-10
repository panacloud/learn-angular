import { Component } from '@angular/core';
import { AngularFire, FirebaseRef, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import {Observable} from 'Rxjs';

@Component({
  selector: 'my-app',
  template: `<h1>My First Angular 2 App</h1>
    <ul>
    <li class="text" *ngFor="let item of ziaFriends | async">
      {{item.$value}}
  </li>
</ul>
  `
})
export class AppComponent { 
  af: AngularFire;
  users: FirebaseObjectObservable<any>;
  ziaFriends: Observable<any[]>;
  constructor(af: AngularFire) {
    this.af = af;
    this.users = af.database.object('users');
    this.populateDB();
    this.ziaFriends = af.database.list('users/zia/friends').map(function(value: any[]){
      return value.map((val) => af.database.object('users/zia/friends/' + val));
    }
    
  }

  populateDB(){
    let jsonObject = {
                      zia: 
                        {
                          name: "Zia Khan",
                          friends: {
                            "inam": true,
                            "zeeshan": true
                          }
                        }
                      },
                      inam: 
                      {
                          name: "Inam Ul Haq",      
                      },
                      zeeshan: {
                        name: "Zeeshan Hanif"
                      };
    this.users.update(jsonObject);
  }

}

