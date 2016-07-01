import { provideRouter, RouterConfig }  from '@angular/router';
import { Page1Component } from './page1.component';
import { Page2Component } from './page2.component';
import { Section1Component } from './section1.page2.component';
import { Section2Component } from './section2.page2.component';

export const routes: RouterConfig = [
  {
    path: 'page1',
    component: Page1Component
  },
  {
    path: 'page2',
    component: Page2Component,
    children: [
      { path: 'section1',  component: Section1Component },
      { path: 'section2',     component: Section2Component },
      { path: '',     redirectTo: 'section1', terminal: true },
    ]
  },
  { path: '', 
    component: Page1Component 
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];



