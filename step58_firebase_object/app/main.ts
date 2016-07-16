import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';


bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyBfPPVdQLUnAq2yJC3yEg2rEdclksJdxvA",
    authDomain: "quickstart-db.firebaseapp.com",
    databaseURL: "https://quickstart-db.firebaseio.com",
    storageBucket: "quickstart-db.appspot.com",
  })
]);







