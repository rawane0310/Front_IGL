import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrackRouteService } from '../services/track-route.service';
import { UserRoleService } from '../services/user-role.service';



/**
 * Guard function to control access to the DPI (Dossier Patient Informatisé) page
 * for users with the 'patient' role.
 * 
 * This guard checks if the current user is a patient and if the patient is trying 
 * to access the correct DPI page by verifying if the `dpiId` from the route 
 * matches the stored `dpiID` in local storage. If the IDs do not match or if the 
 * user is not a patient, access will be denied and a warning message will be shown.
 * 
 * @guard
 * 
 * @param {import('@angular/router').ActivatedRouteSnapshot} route The current route snapshot.
 * @param {import('@angular/router').RouterStateSnapshot} state The current router state snapshot.
 * 
 * @returns {boolean} `true` if the user has the correct role and matches the DPI ID, `false` otherwise.
 */
export const dpiPatientGuard: CanActivateFn = (route, state) => {
  const userRoleService = inject(UserRoleService)
  const role = userRoleService.getRole()

  if(role === 'patient' && localStorage.getItem('dpiID') !== route.paramMap.get('dpiId') ){

    const router = inject(Router);
    const trackRouteService = inject(TrackRouteService);

    Swal.fire({
        icon: 'warning',
        text: "Accès refusé : vos droits d'accès ne vous permettent pas de consulter cette page.",
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
    

  return true
};
