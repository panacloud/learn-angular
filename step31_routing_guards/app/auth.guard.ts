import { CanActivate }    from '@angular/router';

export class AuthGuard implements CanActivate {
  canActivate() {
    console.log('AuthGuard#canActivate called');
    return false;//if you return true then navigation will occur
  }
}
