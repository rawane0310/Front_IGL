import { inject } from "@angular/core"
import { UserRoleService } from "../services/user-role.service"
import Swal from "sweetalert2"
import { CanActivateFn } from '@angular/router';


export const dpiExamenRadiologiqueGuard: CanActivateFn = (route, state) => {
    const userRoleService = inject(UserRoleService)
    const role = userRoleService.getRole()
    if( role == 'radiologue' || role == 'medecin' || role == 'patient') return true

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

    return false
};