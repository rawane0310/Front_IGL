import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor() { }

  getRole(): string | null {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'technicien') return localStorage.getItem('technicianRole')
    return userRole
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole')
  }

  checkRole(role: string): boolean {
    return this.getRole() === role;
  }

  checkUserRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  getId(): string {
    return localStorage.getItem('technicianID') || localStorage.getItem('administratifID') || localStorage.getItem('patientID') || localStorage.getItem('userID') || '';
  }

  getIdNumber(): number {
    return Number(localStorage.getItem('technicianID') || localStorage.getItem('administratifID') || localStorage.getItem('patientID') || localStorage.getItem('userID') || '0');
  }
  checkId(id: string | number): boolean {
    return localStorage.getItem('technicianID') === String(id) ;
  }
}
