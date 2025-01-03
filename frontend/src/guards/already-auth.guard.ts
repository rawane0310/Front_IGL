import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationEnd, NavigationStart, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TrackRouteService } from '../services/track-route.service';

@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthGuard implements CanActivate {
  constructor(public router: Router, public trackRouteService: TrackRouteService) {}

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