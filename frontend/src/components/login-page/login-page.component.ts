import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, FormsModule, HeaderComponent, HttpClientModule],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  // Inside your Angular login response handling
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
      
      
    },
    (error) => {
      console.error('Login failed:', error);
      // Handle error response (e.g., show error message)
    }
  );
}

}
