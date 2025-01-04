import { inject } from "@angular/core"
import { UserRoleService } from "../services/user-role.service"
import Swal from "sweetalert2"
import { CanActivateFn, Router } from "@angular/router"
import { TrackRouteService } from "../services/track-route.service"


/**
 * Guard function to control access to the nursing care (Soin Infirmer) section of the DPI.
 * 
 * This guard allows access to the section only for users with the roles of 'infermier' (nurse), 
 * 'medecin' (doctor), or 'patient'. If the user has a different role, access is denied and a 
 * warning message is shown, redirecting them to the last valid route.
 * 
 * @guard
 * 
 * @param {import('@angular/router').ActivatedRouteSnapshot} route The current route snapshot.
 * @param {import('@angular/router').RouterStateSnapshot} state The current router state snapshot.
 * 
 * @returns {boolean} `true` if the user has an allowed role ('infermier', 'medecin', or 'patient'), `false` otherwise.
 */
export const dpiSoinInfermierGuard: CanActivateFn = (route, state) => {
    const userRoleService = inject(UserRoleService)
    const role = userRoleService.getRole()
    if( role == 'infermier' || role == 'medecin' || role == 'patient') return true

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