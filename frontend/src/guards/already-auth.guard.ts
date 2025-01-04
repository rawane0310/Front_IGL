import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationEnd, NavigationStart, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TrackRouteService } from '../services/track-route.service';


/**
 * Guard that prevents access to routes if the user is already authenticated.
 * 
 * This guard checks if the user has a valid session (access token in `localStorage`).
 * If an access token is found, it prevents navigation to the target route and shows
 * a warning message using `SweetAlert2`. It also redirects the user to the last valid route.
 * 
 * @guard
 */
@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthGuard implements CanActivate {


   /**
   * Creates an instance of the `AlreadyAuthGuard`.
   * 
   * @param {Router} router The router instance to navigate to routes.
   * @param {TrackRouteService} trackRouteService The service that tracks valid routes.
   */
  constructor(public router: Router, public trackRouteService: TrackRouteService) {}


  /**
   * Checks if the user is already authenticated. If an access token is found in `localStorage`,
   * the guard prevents navigation to the target route and displays a warning message.
   * The user is then redirected to the last valid route.
   * 
   * @returns {boolean} `false` if the user is authenticated and navigation is blocked,
   *   `true` if the user is not authenticated and navigation is allowed.
   */
  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const lastValidRoute = this.trackRouteService.getLastValidRouteValue()
      console.log('Last Valid Route:', lastValidRoute);
      Swal.fire({
        icon: 'warning',
        text: "Accès refusé : vous avez déjà une session active. Veuillez d'abord vous déconnecter!",
        confirmButtonColor: '#d33',
        width: '400px',
        iconColor: '#d33',
        customClass: {
          popup: 'small-swal-popup',
        },
      });

      console.log('Last Valid Route:', lastValidRoute);

      this.router.navigate([lastValidRoute]);
      return false;
    } else {
      return true;
    }
  }
}