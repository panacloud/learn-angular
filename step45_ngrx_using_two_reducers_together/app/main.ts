import { bootstrap }    from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app.component';
import { clockReducer, peopleReducer } from './reducers';

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  provideStore({ clock: clockReducer, people: peopleReducer })
 ]);


