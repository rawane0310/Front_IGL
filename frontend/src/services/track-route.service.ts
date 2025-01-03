import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserRoleService } from './user-role.service';

@Injectable({
  providedIn: 'root'
})

export class TrackRouteService {
  inValidRoutes: Array<string> = [];

  constructor(private router: Router, private userRoleService: UserRoleService) {
    this.initLastValidRoute()
    this.setInValidRoutes()
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (!this.inValidRoutes.includes(event.url)) 
      sessionStorage.setItem('lastValidRoute', event.url);
    });
  }

  setInValidRoutes(): void{
    this.inValidRoutes = ['/login', '/']
  }
  initLastValidRoute(): void {
    if( this.userRoleService.checkUserRole('patient')) 
      sessionStorage.setItem('lastValidRoute', '/dpi/'+ localStorage.getItem('dpiID'));

    else if( this.userRoleService.checkUserRole('administratif')) 
      sessionStorage.setItem('lastValidRoute', '/create-patient');

    else if( this.userRoleService.checkUserRole('technicien')) 
      sessionStorage.setItem('lastValidRoute', '/recherche');
  }
  getLastValidRouteValue(): string | null {
    return sessionStorage.getItem('lastValidRoute');
  }
}
