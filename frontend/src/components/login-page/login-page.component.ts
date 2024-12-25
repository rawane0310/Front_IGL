import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

  message: string = '';
  messageType: string = '';
  

  constructor(private http: HttpClient, private router: Router) { }


  onSubmit() {

    if (!this.email.trim() || !this.password.trim()) {
      this.showMessage('Veuillez remplir tous les champs, svp!', 'error');
      return; 
    }

    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:8000/accounts/login/', loginData, { withCredentials: true }).subscribe(
      (response: any) => {
        // Save in localStorage
        const userRole = response.role;

        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('technicianRole', response.technician_role);
        localStorage.setItem('nom', response.nom);
        localStorage.setItem('prenom', response.prenom);
        localStorage.setItem('userID', response.userID);
        localStorage.setItem('dpiID', response.dossier_id);

        // Show success message
        this.showMessage('Connexion réussie!', 'success');

        // Delay the navigation
        setTimeout(() => {
          if (userRole === 'technicien') {
            this.router.navigate(['/recherche']);
          } else if (userRole === 'administratif') {
            this.router.navigate(['/create-patient']);
          } else if (userRole === 'patient') {
            this.router.navigate(['/dpi/',response.dossier_id]);
          }
        }, 2000);
      },
      (error) => {
        this.showMessage('Échec de la connexion. Veuillez vérifier vos informations!', 'error');
        console.error('Login failed:', error);
      }
    );
  }

  // Method to show success or error messages
  showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000); // Clear the message after 3 seconds
  }
}