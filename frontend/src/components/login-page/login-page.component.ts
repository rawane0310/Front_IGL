import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, FormsModule,HeaderComponent],
})


export class LoginPageComponent {
  email: string = '';
  password: string = '';

  onSubmit(): void {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}


