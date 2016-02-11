import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


bootstrap(AppComponent);



var button = document.getElementById('button');

var clicks = Observable.fromEvent(button, "click");



clicks.subscribe(
  (x) => alert("clicked"),
  (err) => alert("error"),
  () => alert('Completed')
);
