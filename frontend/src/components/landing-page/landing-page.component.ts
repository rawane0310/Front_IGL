import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [HeaderComponent],
})
export class LandingPageComponent {
  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
