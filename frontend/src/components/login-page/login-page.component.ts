import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

/**
 * Composant représentant la page de connexion (Login Page) de l'application.
 * Permet aux utilisateurs de saisir leurs identifiants (email et mot de passe) 
 * et de naviguer vers d'autres pages.
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, FormsModule, HeaderComponent], // Modules nécessaires au fonctionnement du composant
})
export class LoginPageComponent {

  /**
   * Adresse email saisie par l'utilisateur.
   * @type {string}
   */
  email: string = '';

  /**
   * Mot de passe saisi par l'utilisateur.
   * @type {string}
   */
  password: string = '';

  /**
   * Constructeur du composant.
   * Injecte le service Router pour gérer la navigation entre les pages.
   * 
   * @param router - Service Angular permettant de naviguer entre les différentes routes.
   */
  constructor(private router: Router) { }

  /**
   * Méthode appelée lors de la soumission du formulaire de connexion.
   */
  onSubmit(): void {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  /**
   * Méthode permettant de naviguer vers la page de recherche d'un dossier DPI.
   * Cette navigation peut être déclenchée après une connexion réussie.
   */
  navigateToLogin() {
    this.router.navigate(['/recherche']); 
  }
}
