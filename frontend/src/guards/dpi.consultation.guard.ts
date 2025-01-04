import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core"
import { UserRoleService } from "../services/user-role.service"
import Swal from "sweetalert2"
import { Router } from "@angular/router"
import { TrackRouteService } from "../services/track-route.service"


/**
 * Guard function that restricts access to the "DPI Consultation" section 
 * based on the user's role.
 * 
 * This guard allows access if the user has the role of 'medecin' (doctor) 
 * or 'patient'. If the user does not have one of these roles, access is denied
 * and a warning is shown.
 * 
 * @guard
 * 
 * @param {import('@angular/router').ActivatedRouteSnapshot} route The current route snapshot.
 * @param {import('@angular/router').RouterStateSnapshot} state The current router state snapshot.
 * 
 * @returns {boolean} `true` if the user has the required role to access the route, `false` otherwise.
 */
export const  dpiConsultationGuard: CanActivateFn = (route, state) => {
    const userRoleService = inject(UserRoleService)
    const role = userRoleService.getRole()
    if( role == 'medecin' || role == 'patient') return true

    const router = inject(Router);
    const trackRouteService = inject(TrackRouteService);
    Swal.fire({
        icon: 'warning',
        text: "Accès refusé : vos droits d'accès ne vous permettent pas de consulter cette section du DPI.",
        confirmButtonColor: '#d33',
        width: '400px',
        iconColor: '#d33',
        customClass: {
          popup: 'small-swal-popup',
        },
    })

    router.navigate([trackRouteService.getLastValidRouteValue()])
    return false
}