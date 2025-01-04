import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserRoleService } from './user-role.service';



/**
 * Service that tracks the last valid route in the Angular application.
 * 
 * This service listens for route navigation events and updates the session storage with the last valid route.
 * It also provides methods to retrieve the last valid route or initialize it based on the user's role.
 * The valid routes are dynamically set and can be modified if needed.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})

export class TrackRouteService {

  /**
   * A list of invalid routes where the last valid route shouldn't be updated.
   * These routes are typically used for login or other non-application areas.
   * 
   * @type {Array<string>}
   * @example ['/login', '/']
   */
  inValidRoutes: Array<string> = [];
  



  /**
   * Initializes the `TrackRouteService` and sets up route tracking.
   * The service listens for route navigation events and updates the session storage with the last valid route.
   * 
   * @constructor
   * @param {Router} router - The Angular router instance to listen to navigation events.
   * @param {UserRoleService} userRoleService - The service to check the user's role and customize route behavior.
   */
  constructor(private router: Router, private userRoleService: UserRoleService) {
    this.setInValidRoutes()
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (!this.inValidRoutes.includes(event.url)) 
      sessionStorage.setItem('lastValidRoute', event.url);
    });
  }


  /**
   * Sets the list of invalid routes that should not be tracked as the last valid route.
   * These routes are typically those that the user shouldn't navigate back to, like login or home pages.
   * 
   * @method
   */
  setInValidRoutes(): void{
    this.inValidRoutes = ['/login', '/']
  }


  /**
   * Initializes the last valid route based on the user's role.
   * The method checks the user's role and returns the appropriate default route for that role.
   * 
   * @method
   * @returns {string} The default route for the user based on their role.
   */
  initLastValidRouteValue(): string {
    console.log('initLastValidRoute called')
    if( this.userRoleService.checkUserRole('patient')) return '/dpi/'+ localStorage.getItem('dpiID')
    else if( this.userRoleService.checkUserRole('administratif')) return '/create-patient'
    else if( this.userRoleService.checkUserRole('technicien')) return '/recherche'
    else return '/login'
  }


  /**
   * Retrieves the last valid route from session storage or determines the default route based on the user's role.
   * 
   * @method
   * @returns {string | null} The last valid route URL or the default route if none is found.
   */
  getLastValidRouteValue(): string | null {
    return sessionStorage.getItem('lastValidRoute') || this.initLastValidRouteValue();
  }
}
