import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthGuard implements CanActivate {
  constructor(private router: Router) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url !== '/login' && event.url !== '/') {
        sessionStorage.setItem('lastValidRoute', event.url);
      }
    });
  }

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const lastValidRoute = sessionStorage.getItem('lastValidRoute')
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