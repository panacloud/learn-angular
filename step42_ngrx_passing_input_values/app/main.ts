import { bootstrap }    from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app.component';
import { clockReducer } from './reducers';

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  provideStore({ clock: clockReducer })
 ]);


