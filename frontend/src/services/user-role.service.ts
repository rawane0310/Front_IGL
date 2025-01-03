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
}
