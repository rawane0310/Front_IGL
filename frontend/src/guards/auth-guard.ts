import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

/**
 * Guard that checks if the user is authenticated before allowing access to a route.
 * 
 * This guard ensures that only users with a valid session (indicated by an access token
 * in `localStorage`) can access certain routes. If the user is not authenticated, 
 * they are shown a warning message and redirected to the login page.
 * 
 * @guard
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {


  /**
   * Creates an instance of the `AuthGuard`.
   * 
   * @param {Router} router The router instance to navigate to routes.
   */
  constructor(private router: Router) { }


  /**
   * Checks if the user is authenticated by looking for an access token in `localStorage`.
   * If an access token is found, the user is allowed to proceed. Otherwise, the user
   * is shown a warning and redirected to the login page.
   * 
   * @returns {boolean} `true` if the user is authenticated, allowing access to the route,
   *   `false` if the user is not authenticated, blocking access and redirecting to the login page.
   */
  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return true;
    } else {
      Swal.fire({
        icon: 'warning',
        text: "Vous devez vous connecter d'abord !",
        confirmButtonColor: '#d33',
        width: '400px',
        iconColor: '#d33',
        customClass: {
          popup: 'small-swal-popup'
        },

      });
      this.router.navigate(['/login']);

      return false;
    }
  }
}
