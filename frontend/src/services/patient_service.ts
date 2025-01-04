/**
 * @file PatientService
 * @description Service Angular pour gérer les opérations liées aux patients, telles que la recherche, la création de dossiers et la déconnexion.
 * @module PatientService
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @@Injectable
 * Fournit les fonctionnalités liées aux patients et est injecté au niveau racine de l'application.
 */
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  /**
   * URL de base pour les appels API liés aux dossiers des patients.
   * @type {string}
   */
  private baseUrl = 'http://localhost:8000/dpi';

  /**
   * Initialise le service avec un client HTTP pour effectuer des requêtes HTTP.
   * @param http {HttpClient} Client HTTP Angular.
   */
  constructor(private http: HttpClient) {}

  /**
   * Ajoute des en-têtes d'autorisation aux requêtes.
   * @returns {HttpHeaders} Les en-têtes avec le token d'autorisation, si disponible.
   */
  private getAuthHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    });
  }

  /**
   * Recherche un patient par son NSS.
   * @param nss {string} Le numéro de sécurité sociale (NSS) du patient.
   * @returns {Observable<any>} Un Observable contenant les données du patient et du dossier.
   */
  searchPatientByNSS(nss: string): Observable<any> {
    const params = new HttpParams().set('nss', nss);
    return this.http.get(`${this.baseUrl}/search_by_nss/`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }

  /**
   * Recherche un patient via un code QR (id et nom).
   * @param id {string} Identifiant du patient.
   * @param name {string} Nom du patient.
   * @returns {Observable<any>} Un Observable contenant les données du patient et du dossier.
   */
  searchPatientByQRCode(id: string, name: string): Observable<any> {
    const params = new HttpParams().set('id', id).set('nom', name);
    return this.http.get(`${this.baseUrl}/search-by-qr/`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }

  /**
   * Crée un dossier pour un patient.
   * @param patientData {Record<string, string>} Les données du patient à enregistrer.
   * @returns {Observable<any>} Un Observable contenant la réponse du serveur pour la création.
   */
  createDossierPatient(patientData: Record<string, string>): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerUserPatient/`, patientData, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Déconnecte un utilisateur en supprimant le token de rafraîchissement.
   * @param refreshToken {string} Le token de rafraîchissement pour l'utilisateur.
   * @returns {Observable<any>} Un Observable contenant la réponse du serveur pour la déconnexion.
   */
  logout(refreshToken: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(
      'http://localhost:8000/accounts/logout/',
      { refresh: refreshToken },
      { headers }
    );
  }
}
