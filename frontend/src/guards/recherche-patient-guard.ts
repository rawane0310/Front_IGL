import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class RechercheDossierGuard implements CanActivate {
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
        const userRole = localStorage.getItem('userRole');

        if (userRole !== 'patient' && userRole !== 'administratif') {
            return true;
        } else {
            const lastValidRoute = sessionStorage.getItem('lastValidRoute')
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
