import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service Angular pour interagir avec les données des patients.
 * Fournit des méthodes pour effectuer des opérations sur les données des patients via des appels HTTP au backend.
 */
@Injectable({
  providedIn: 'root', // Rend le service disponible dans toute l'application sans devoir l'importer dans un module spécifique.
})
export class PatientService {

  /**
   * URL de base pour les appels au backend liés au DPI (Dossier Patient Informatisé).
   * @type {string}
   */
  private apiUrl = 'http://localhost:8000/dpi';

  /**
   * Constructeur du service PatientService.
   * Injecte le service HttpClient pour permettre les appels HTTP au backend.
   * 
   * @param http - Service Angular permettant d'effectuer des requêtes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Recherche un patient par son NSS (Numéro de Sécurité Sociale).
   * Envoie une requête GET au backend pour récupérer les informations du patient.
   * 
   * @param nss - Numéro de Sécurité Sociale du patient à rechercher.
   * @returns Un observable contenant les données du patient correspondant au NSS.
   */
  searchPatientByNSS(nss: string): Observable<any> {
    // Ajoute le paramètre 'nss' à la requête HTTP.
    const params = new HttpParams().set('nss', nss);

    // Envoie une requête GET au backend avec les paramètres définis.
    return this.http.get(`${this.apiUrl}/search_by_nss/`, { params });
  }
}
