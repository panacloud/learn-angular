import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';
import { EqualValidator } from './equal-validator.directive';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [EqualValidator]
})
export class AppComponent implements OnInit {
  public user: User;

  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  save(f: User, isValid: boolean) {

  }
}
