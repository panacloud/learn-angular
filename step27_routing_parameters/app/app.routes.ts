import { provideRouter, RouterConfig }  from '@angular/router';
import { Page1Component } from './page1.component';
import { Page2Component } from './page2.component';

export const routes: RouterConfig = [
  {
    path: 'page1',
    component: Page1Component
  },
  {
    path: 'page2/:id',
    component: Page2Component
  },
  { path: '', 
    component: Page1Component 
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];



