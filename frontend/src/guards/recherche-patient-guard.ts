import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';
import { TrackRouteService } from '../services/track-route.service';

@Injectable({
    providedIn: 'root',
})
export class RechercheDossierGuard implements CanActivate {
    constructor(private router: Router, public trackRouteService: TrackRouteService) {}


    canActivate(): boolean {
        const userRole = localStorage.getItem('userRole');

        if (userRole !== 'patient' && userRole !== 'administratif') {
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
