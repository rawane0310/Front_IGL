import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserRoleService } from './user-role.service';

@Injectable({
  providedIn: 'root'
})

export class TrackRouteService {
  inValidRoutes: Array<string> = [];
  i: number = 0;
  constructor(private router: Router, private userRoleService: UserRoleService) {
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
  initLastValidRouteValue(): string {
    console.log('initLastValidRoute called')
    if( this.userRoleService.checkUserRole('patient')) return '/dpi/'+ localStorage.getItem('dpiID')
    else if( this.userRoleService.checkUserRole('administratif')) return '/create-patient'
    else if( this.userRoleService.checkUserRole('technicien')) return '/recherche'
    else return '/login'
  }
  getLastValidRouteValue(): string | null {
    
    return sessionStorage.getItem('lastValidRoute') || this.initLastValidRouteValue();
  }
}
