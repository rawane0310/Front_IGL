import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * Composant représentant la page de connexion (Login Page) de l'application.
 * Permet aux utilisateurs de saisir leurs identifiants (email et mot de passe) 
 * et de naviguer vers d'autres pages en fonction de leur rôle.
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, FormsModule, HeaderComponent, HttpClientModule],
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
   * Message à afficher à l'utilisateur (succès ou erreur).
   * @type {string}
   */
  message: string = '';

  /**
   * Type du message à afficher (success ou error).
   * @type {'success' | 'error'}
   */
  messageType: string = '';

  /**
   * Constructeur du composant LoginPageComponent.
   * @param {HttpClient} http - Service pour effectuer des requêtes HTTP.
   * @param {Router} router - Service pour naviguer entre les pages.
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Méthode déclenchée lors de la soumission du formulaire de connexion.
   * Vérifie les champs, envoie les données de connexion au backend,
   * et redirige l'utilisateur en fonction de son rôle.
   */
  onSubmit(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.showMessage('Veuillez remplir tous les champs, svp!', 'error');
      return;
    }

    const loginData = { email: this.email, password: this.password };

    this.http
      .post('http://localhost:8000/accounts/login/', loginData, { withCredentials: true })
      .subscribe(
        (response: any) => {
          // Stockage des informations utilisateur dans localStorage
          const userRole = response.role;
          localStorage.clear();
          localStorage.setItem('accessToken', response.access);
          localStorage.setItem('refreshToken', response.refresh);
          localStorage.setItem('userRole', userRole);
          localStorage.setItem('userID', response.userID);
          localStorage.setItem('nom', response.nom);
          localStorage.setItem('prenom', response.prenom);

          // Stockage spécifique en fonction du rôle utilisateur
          if (userRole === 'technicien') {
            localStorage.setItem('technicianRole', response.technician_role);
            localStorage.setItem('technicianID', response.technicien_id);
          } else if (userRole === 'patient') {
            localStorage.setItem('dpiID', response.dossier_id);
            localStorage.setItem('patientID', response.patient_id);
          } else if (userRole === 'admin') {
            localStorage.setItem('adminID', response.admin_id);
          } else if (userRole === 'administratif') {
            localStorage.setItem('administratifID', response.administratif_id);
          }

          // Affichage d'un message de succès
          this.showMessage('Connexion réussie!', 'success');

          // Navigation différée en fonction du rôle
          setTimeout(() => {
            if (userRole === 'technicien') {
              this.router.navigate(['/recherche']);
            } else if (userRole === 'administratif') {
              this.router.navigate(['/create-patient']);
            } else if (userRole === 'patient') {
              this.router.navigate(['/dpi/', response.dossier_id]);
            } else {
              this.router.navigate(['/']); // Route par défaut
            }
          }, 2000);
        },
        (error) => {
          // Affichage d'un message d'erreur
          this.showMessage('Échec de la connexion. Veuillez vérifier vos informations!', 'error');
          console.error('Login failed:', error);
        }
      );
  }

  /**
   * Affiche un message (succès ou erreur) à l'utilisateur.
   * @param {string} message - Contenu du message à afficher.
   * @param {'success' | 'error'} type - Type du message (succès ou erreur).
   */
  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000); // Efface le message après 3 secondes
  }
}
