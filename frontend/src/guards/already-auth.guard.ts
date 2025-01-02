import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const actualRoute = this.router.url; 

      Swal.fire({
        icon: 'warning',
        text: 'Vous êtes déjà connecté! Veuillez vous déconnecter pour accéder à la page de connection.',
        confirmButtonColor: '#d33',
        width: '400px',
        iconColor: '#d33',
        customClass: {
          popup: 'small-swal-popup',
        },
      });

      console.log('Actual Route:', actualRoute);
      //i did this beacuse when tapping the login url it redirect me to the / and not the real actual path so i should clear the storage so i can log in again
      if (actualRoute === '/') {
        localStorage.clear();
      
      }
      // Redirect to the current route (to stay on the same page)
      this.router.navigate([actualRoute]);
      return false;
    } else {
      return true;
    }
  }
}
