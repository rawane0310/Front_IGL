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

  constructor(private http: HttpClient, private router: Router) { }


  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:8000/accounts/login/', loginData, { withCredentials: true }).subscribe(
      (response: any) => {
        console.log('Login successful:', response);

        // Save the access token in localStorage
        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('userRole', response.role);
        console.log('User role saved in localStorage:', response.role);

        // Tokens are saved automatically in cookies by the backend ( login api )
        console.log('Tokens saved in cookies');


        const userRole = response.role;

        // Vérification du rôle et redirection en conséquence
        if (userRole === 'medcin') {
          this.router.navigate(['/recherche']);
        } else if (userRole === 'administratif') {
          this.router.navigate(['/create-patient']);
        } else if (userRole === 'patient') {
          // Redirection vers la page de dossier patient creer par BOUCHRA ET MERIEM
          this.router.navigate(['/dossier-patient']);
        } else {
          // Optionnel : gestion du cas où le rôle est inconnu ou inexistant
          console.error('Rôle utilisateur non reconnu :', userRole);
          this.router.navigate(['/']);
        }


      },
      (error) => {
        console.error('Login failed:', error);
        // Handle error response (e.g., show error message)
      }
    );
  }

}


