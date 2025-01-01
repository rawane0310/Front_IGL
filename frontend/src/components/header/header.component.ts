import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolderOpen, faMagnifyingGlass, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { PatientService } from '../../services/patient_service';



/**
 * Composant représentant l'en-tête de l'application, incluant la logique d'affichage de la photo de profil et du bouton "Ajouter DPI"
 * en fonction du rôle de l'utilisateur et de la page actuelle.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faFolderOpen = faFolderOpen;
  faMagnifyingGlass = faMagnifyingGlass;
  faArrowRightFromBracket = faArrowRightFromBracket;

  /** Variable pour vérifier si l'utilisateur est sur la page d'accueil (Landing Page) */
  isLandingPage: boolean = false;

  /** Variable pour vérifier si l'utilisateur est sur la page de connexion */
  isLoginPage: boolean = false;

  /** Variable pour vérifier si l'utilisateur a le rôle administratif */
  isAdministrativeRole: boolean = false;
  isTechnicienRole: boolean = false;

  userFullName: string = 'Guest';
  userId: string = '-';

  isPopupVisible = false;


  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }


  /**
   * Constructeur du composant. Il initialise les vérifications de la route actuelle et du rôle utilisateur.
   * 
   * @param router - Service Angular permettant de naviguer entre les différentes pages.
   */
  constructor(private router: Router, private patientService: PatientService) {
    this.checkCurrentRoute();
    this.checkUserRole();
  }

  /**
   * Méthode pour vérifier si l'utilisateur est sur la page d'accueil ou la page de connexion
   * et ajuster les variables `isLandingPage` et `isLoginPage` en conséquence.
   */
  checkCurrentRoute() {
    const currentRoute = this.router.url;

    // Vérifie si l'utilisateur est sur la page d'accueil
    this.isLandingPage = currentRoute === '/';

    // Vérifie si l'utilisateur est sur la page de connexion
    this.isLoginPage = currentRoute.includes('/login');
  }

  ngOnInit() {
    const firstName = localStorage.getItem('nom');
    const lastName = localStorage.getItem('prenom');
    const userRole = localStorage.getItem('userRole');
    const technicianRole = localStorage.getItem('technicianRole');
    let userID = ''

    if (userRole === 'technicien') {
      userID = localStorage.getItem('technicianID') || '';
    } else if (userRole === 'administratif') {
      userID = localStorage.getItem('administratifID') || '';
    } else if (userRole === 'patient') {
      userID = localStorage.getItem('patientID') || '';
    } else if (userRole === 'admin') {
      userID = localStorage.getItem('adminID') || '';
    }
    if (firstName && lastName && userID) {
      if (technicianRole === 'medecin') {
        this.userFullName = `Dr.${firstName} ${lastName}`;
        this.userId = userID;
        return;
      }
      this.userFullName = `${firstName} ${lastName}`;
      this.userId = userID;
    } else {
      this.userFullName = 'Guest';
      this.userId = '-';
    }
  }

  /**
   * Méthode pour vérifier le rôle de l'utilisateur en récupérant la valeur stockée dans le localStorage.
   * Si le rôle est "administratif", la variable `isAdministrativeRole` est définie à true.
   */
  checkUserRole() {
    const userRole = localStorage.getItem('userRole'); // Le rôle est stocké dans localStorage
    const TechnicianRole = localStorage.getItem('technicianRole');
    this.isAdministrativeRole = userRole === 'administratif' || TechnicianRole === 'medecin';
    this.isTechnicienRole = userRole === 'technicien';;
  }

  /**
   * Méthode pour rediriger l'utilisateur vers la page de création d'un DPI.
   * Cette méthode est appelée lors du clic sur le bouton "Ajouter DPI".
   */
  redirectToCreateDpi() {
    this.router.navigate(['/create-patient']);
  }

  search() {
    this.router.navigate(['/recherche']);
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.patientService.logout(refreshToken).subscribe({
        next: () => {
          // Clear tokens and navigate to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.clear();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Logout failed:', err);
        },
      });
    } else {
      console.error('No refresh token found');
    }
  }

}
