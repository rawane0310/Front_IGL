import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

/**
 * Composant représentant la page d'accueil (Landing Page) de l'application.
 * Il inclut le composant Header et fournit une méthode pour naviguer vers la page de connexion.
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [HeaderComponent], // Inclut le composant Header dans la Landing Page
})
export class LandingPageComponent {

  /**
   * Constructeur du composant. Injecte le service Router pour gérer la navigation entre les pages.
   * 
   * @param router - Service Angular permettant de naviguer entre les différentes routes.
   */
  constructor(private router: Router) { }

  /**
   * Méthode permettant de naviguer vers la page de connexion.
   * Cette méthode est déclenchée par un clic sur un bouton ou un lien de la Landing Page.
   */
  navigateToLogin() {
    this.router.navigate(['/login']); 
  }
}
