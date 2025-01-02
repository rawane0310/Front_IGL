import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return true; 
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Vous devez connecter au premier!.',
        confirmButtonColor: '#d33',
        width: '400px',
        iconColor: '#d33',
        customClass: {
          popup: 'small-swal-popup'
        },

      });
      this.router.navigate(['/login']);

      return false;
    }
  }
}
