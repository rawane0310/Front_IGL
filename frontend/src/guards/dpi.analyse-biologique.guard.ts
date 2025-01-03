import { inject } from "@angular/core"
import { UserRoleService } from "../services/user-role.service"
import Swal from "sweetalert2"
import { CanActivateFn, Router } from '@angular/router';
import { TrackRouteService } from "../services/track-route.service";

export const dpiAnalyseBiologiqueGuard: CanActivateFn = (route, state) => {
    const userRoleService = inject(UserRoleService)
    const role = userRoleService.getRole()
    if( role == 'laborantin' || role == 'medecin' || role == 'patient') return true
    
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
};