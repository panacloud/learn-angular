import { provideRouter, RouterConfig }  from '@angular/router';
import { Page1Component } from './page1.component';
import { Page2Component } from './page2.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';

export const routes: RouterConfig = [
  {
    path: 'page1',
    component: Page1Component
  },
  {
    path: 'page2',
    component: Page2Component
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  { path: '', 
    component: Page1Component 
  }
];

export const AUTH_PROVIDERS = [AuthGuard];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];



