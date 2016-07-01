import { provideRouter, RouterConfig }  from '@angular/router';
import { Page1Component } from './page1.component';
import { Page2Routes } from './page2/page2.routes';

export const routes: RouterConfig = [
  ...Page2Routes,//Using ES6 spread operator (...).
  {
    path: 'page1',
    component: Page1Component
  },
  { path: '', 
    component: Page1Component 
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];



