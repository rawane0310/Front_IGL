import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackRouteService {
  
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url !== '/login' && event.url !== '/') 
      sessionStorage.setItem('lastValidRoute', event.url);
    });
  }

  getLastValidRouteValue(): string | null {
    return sessionStorage.getItem('lastValidRoute');
  }
}
