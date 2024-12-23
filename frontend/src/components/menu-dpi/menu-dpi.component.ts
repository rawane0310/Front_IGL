import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AppComponent } from "../../app/app.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-dpi',
  standalone: true,
  imports: [NgIf, AppComponent, CommonModule],
  templateUrl: './menu-dpi.component.html',
  styleUrls: ['./menu-dpi.component.css'] 
})
export class MenuDpiComponent {
 
  activeTab: string = 'info';
  constructor(private router: Router) {

  }
  navigateTo(tab: string, route: string, event: Event) {
   
    const clickedTab = (event.target as HTMLElement).closest('.tab') as HTMLElement;
  
    
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tabElement => tabElement.classList.remove('active'));
  
    
    if (clickedTab) {
      clickedTab.classList.add('active');
    }
  
    
    this.activeTab = tab;
  
    
    this.router.navigate([route]);
  }
  /*activeTab: string = 'info';
  constructor(private router: Router) {

    }

    navigateToConsultation() {
      this.updateActiveTab('consultation');

      this.router.navigate(['/consultations-dpi']);
    }

    navigateToSoins() {
      this.updateActiveTab('soins');
      this.router.navigate(['/soins-dpi']);
    }

    navigateToExamen() {
      this.updateActiveTab('examen');
      this.router.navigate(['/examens-dpi']);
    }

    navigateToInfo() {
      this.updateActiveTab('info');
      this.router.navigate(['/infos-dpi']);
    }

    updateActiveTab(tab: string) {
      this.activeTab = tab;
    } */
}
