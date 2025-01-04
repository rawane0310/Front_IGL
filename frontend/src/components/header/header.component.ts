import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolderOpen, faMagnifyingGlass, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { PatientService } from '../../services/patient_service';

/**
 * Composant représentant l'en-tête de l'application.
 * Permet de naviguer, gérer la déconnexion et afficher des informations utilisateur.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  /**
   * Icône pour ouvrir un dossier.
   * @type {IconDefinition}
   */
  faFolderOpen = faFolderOpen;

  /**
   * Icône pour la loupe de recherche.
   * @type {IconDefinition}
   */
  faMagnifyingGlass = faMagnifyingGlass;

  /**
   * Icône pour la déconnexion (flèche de sortie).
   * @type {IconDefinition}
   */
  faArrowRightFromBracket = faArrowRightFromBracket;

  /**
   * Indique si la page actuelle est la page d'accueil.
   * @type {boolean}
   */
  isLandingPage: boolean = false;

  /**
   * Indique si la page actuelle est la page de connexion.
   * @type {boolean}
   */
  isLoginPage: boolean = false;

  /**
   * Indique si l'utilisateur a un rôle administratif.
   * @type {boolean}
   */
  isAdministrativeRole: boolean = false;

  /**
   * Indique si l'utilisateur a un rôle de technicien.
   * @type {boolean}
   */
  isTechnicienRole: boolean = false;

  /**
   * Nom complet de l'utilisateur.
   * @type {string}
   */
  userFullName: string = 'Guest';

  /**
   * ID de l'utilisateur.
   * @type {string}
   */
  userId: string = '-';

  /**
   * Indique si le popup de l'en-tête est visible.
   * @type {boolean}
   */
  isPopupVisible = false;

  /**
   * Bascule la visibilité du popup.
   * @function
   */
  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  /**
   * Constructeur du composant.
   * Initialise les vérifications de la route actuelle et du rôle de l'utilisateur.
   * @param {Router} router - Service pour la navigation.
   * @param {PatientService} patientService - Service pour la gestion des patients.
   */
  constructor(private router: Router, private patientService: PatientService) {
    this.checkCurrentRoute();
    this.checkUserRole();
  }

  /**
   * Vérifie la route actuelle pour savoir si c'est la page d'accueil ou la page de connexion.
   * Définit les variables `isLandingPage` et `isLoginPage` en fonction de l'URL actuelle.
   */
  checkCurrentRoute() {
    const currentRoute = this.router.url;

    this.isLandingPage = currentRoute === '/';
    this.isLoginPage = currentRoute.includes('/login');
  }

  /**
   * Méthode exécutée lors de l'initialisation du composant.
   * Récupère et définit les informations de l'utilisateur stockées dans `localStorage`.
   */
  ngOnInit() {
    const firstName = localStorage.getItem('nom');
    const lastName = localStorage.getItem('prenom');
    const userRole = localStorage.getItem('userRole');
    const technicianRole = localStorage.getItem('technicianRole');
    let userID = '';

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
   * Vérifie le rôle de l'utilisateur et définit les variables `isAdministrativeRole` et `isTechnicienRole`.
   * Récupère le rôle de l'utilisateur dans `localStorage` pour savoir s'il est administratif ou technicien.
   */
  checkUserRole() {
    const userRole = localStorage.getItem('userRole');
    const TechnicianRole = localStorage.getItem('technicianRole');
    this.isAdministrativeRole = userRole === 'administratif' || TechnicianRole === 'medecin';
    this.isTechnicienRole = userRole === 'technicien';
  }

  /**
   * Redirige l'utilisateur vers la page de création d'un patient.
   * @function
   */
  redirectToCreateDpi() {
    this.router.navigate(['/create-patient']);
  }

  /**
   * Effectue une recherche et redirige vers la page de recherche.
   * @function
   */
  search() {
    this.router.navigate(['/recherche']);
  }

  /**
   * Déconnecte l'utilisateur et nettoie les informations stockées dans `localStorage`.
   * Redirige ensuite l'utilisateur vers la page de connexion.
   * @function
   */
  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.patientService.logout(refreshToken).subscribe({
        next: () => {
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
