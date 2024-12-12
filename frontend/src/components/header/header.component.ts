import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLandingPage: boolean = false;
  isLoginPage: boolean = false;

  constructor(private router: Router) {

    this.checkCurrentRoute();
  }

  checkCurrentRoute() {
    const currentRoute = this.router.url;

    this.isLandingPage = currentRoute === '/' ;

    this.isLoginPage = currentRoute.includes('/login');
  }
}