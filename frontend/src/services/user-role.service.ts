import { Injectable } from '@angular/core';


/**
 * Service for managing and retrieving user roles and related information.
 * 
 * This service provides methods for checking the current user's role, retrieving user IDs,
 * and performing role-based checks. It primarily interacts with the `localStorage` to manage
 * role and ID data.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  /**
   * Initializes the UserRoleService.
   * 
   * The constructor does not take any parameters and is responsible for managing
   * role and ID-related operations based on data in `localStorage`.
   * 
   * @constructor
   */
  constructor() { }
  
  
  /**
   * Retrieves the role of the current user.
   * 
   * This method checks `localStorage` for the role stored as 'userRole' and returns the role.
   * If the role is 'technicien', it attempts to retrieve the 'technicianRole' instead.
   * 
   * @returns {string | null} The role of the user, or `null` if not found.
   */
  getRole(): string | null {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'technicien') return localStorage.getItem('technicianRole')
    return userRole
  }


  /**
   * Retrieves the user role from `localStorage`.
   * 
   * @returns {string | null} The role stored in `localStorage`, or `null` if not set.
   */
  getUserRole(): string | null {
    return localStorage.getItem('userRole')
  }


  /**
   * Checks if the current user's role matches the specified role.
   * 
   * This method compares the current user role (retrieved via `getRole()`) with the
   * provided role and returns `true` if they match, or `false` if they do not.
   * 
   * @param {string} role The role to check.
   * @returns {boolean} `true` if the current user's role matches the provided role, `false` otherwise.
   */
  checkRole(role: string): boolean {
    return this.getRole() === role;
  }


  /**
   * Checks if the current user role matches the specified role (alternative method).
   * 
   * This method compares the user role (retrieved via `getUserRole()`) with the
   * provided role and returns `true` if they match, or `false` if they do not.
   * 
   * @param {string} role The role to check.
   * @returns {boolean} `true` if the current user's role matches the provided role, `false` otherwise.
   */
  checkUserRole(role: string): boolean {
    return this.getUserRole() === role;
  }


   /**
   * Retrieves the ID of the current user from `localStorage`.
   * 
   * This method attempts to retrieve the user ID, checking for 'technicianID', 'administratifID',
   * 'patientID', and 'userID' in `localStorage`. It returns the first available ID or an empty string.
   * 
   * @returns {string} The ID of the current user, or an empty string if none found.
   */
  getId(): string {
    return localStorage.getItem('technicianID') || localStorage.getItem('administratifID') || localStorage.getItem('patientID') || localStorage.getItem('userID') || '';
  }


  /**
   * Retrieves the ID of the current user as a number.
   * 
   * Similar to `getId()`, this method retrieves the user ID from `localStorage` but converts
   * the ID to a number. If no ID is found, it returns `0`.
   * 
   * @returns {number} The ID of the current user as a number, or `0` if none found.
   */
  getIdNumber(): number {
    return Number(localStorage.getItem('technicianID') || localStorage.getItem('administratifID') || localStorage.getItem('patientID') || localStorage.getItem('userID') || '0');
  }

   /**
   * Checks if the current user's ID matches the provided ID.
   * 
   * This method compares the user ID (retrieved via `getId()`) with the provided ID and returns
   * `true` if they match, or `false` otherwise.
   * 
   * @param {string | number} id The ID to check.
   * @returns {boolean} `true` if the current user's ID matches the provided ID, `false` otherwise.
   */
  checkId(id: string | number): boolean {
    return localStorage.getItem('technicianID') === String(id) ;
  }
}
