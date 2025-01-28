import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Patient {
  id: number; // Unique identifier
  nss: string; // Numéro de sécurité sociale
  nom: string; // Last name
  prenom: string; // First name
  date_naissance: string; // Date of birth (in "YYYY-MM-DD" format)
  adresse: string; // Address
  tel: string; // Telephone number
  personne_a_contacter: string; // Emergency contact person
  medecin_traitant: number; // Doctor ID (assuming it's a number referencing a doctor)
  mutuelle: string; // Insurance or mutual affiliation
}
@Injectable({
  providedIn: 'root'
})
export class InfoPatientService {

  private apiUrl = 'http://localhost:7000/dpi/search-patient';

  constructor(private http: HttpClient) {}

  // Function to fetch a patient by ID
  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}/`);
  }
}
