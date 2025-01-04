import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';
import { TrackRouteService } from '../services/track-route.service';


/**
 * Guard that restricts access to the "create patient" page based on the user's role.
 * 
 * This guard ensures that only users with the role 'administratif' or 'medecin' (doctor) 
 * can access the route for creating a new patient. If the user does not have the required
 * role, they are shown a warning and redirected to the last valid route.
 * 
 * @guard
 */
@Injectable({
    providedIn: 'root',
})
export class CreatePatientGuard implements CanActivate {

    /**
   * Creates an instance of the `CreatePatientGuard`.
   * 
   * @param {Router} router The router instance to navigate to routes.
   * @param {TrackRouteService} trackRouteService The service to track and get the last valid route.
   */
    constructor(private router: Router, public trackRouteService: TrackRouteService) {}



    /**
   * Checks the user's role to determine if they have access to create a new patient.
   * 
   * - If the user has the 'administratif' role or the 'medecin' (doctor) role, 
   *   they are allowed to proceed.
   * - If the user does not have one of these roles, they are shown a warning and 
   *   redirected to the last valid route.
   * 
   * @returns {boolean} `true` if the user has the required role to access the route,
   *   `false` if the user does not have the required role, blocking access and redirecting to the last valid route.
   */
    canActivate(): boolean {
        const userRole = localStorage.getItem('userRole');
        const technicienRole = localStorage.getItem('technicianRole');
        if (userRole === 'administratif' || technicienRole === 'medecin') {
            return true;
        } else {
            const lastValidRoute = this.trackRouteService.getLastValidRouteValue();
            Swal.fire({
                icon: 'warning',
                text: "Vous n'avez pas accès à cette page !",
                confirmButtonColor: '#d33',
                width: '400px',
                iconColor: '#d33',
                customClass: {
                    popup: 'small-swal-popup'
                },

            });
            this.router.navigate([lastValidRoute]);

            return false;
        }
    }
}
