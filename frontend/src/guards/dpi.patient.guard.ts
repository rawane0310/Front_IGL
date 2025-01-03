import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrackRouteService } from '../services/track-route.service';
import { UserRoleService } from '../services/user-role.service';

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
