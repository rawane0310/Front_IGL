import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'http://localhost:8000/dpi';

  constructor(private http: HttpClient) {}

  /**
   * Add authorization headers to the request.
   * @returns HttpHeaders with the Authorization header if the token exists.
   */
  private getAuthHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    });
  }

  /**
   * Search for a patient by NSS.
   * @param nss The NSS of the patient.
   * @returns An Observable containing the patient and dossier data.
   */
  searchPatientByNSS(nss: string): Observable<any> {
    const params = new HttpParams().set('nss', nss);
    return this.http.get(`${this.baseUrl}/search_by_nss/`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }

  /**
   * Search for a patient by QR code (id and name).
   * @param id The patient's ID.
   * @param name The patient's name.
   * @returns An Observable containing the patient and dossier data.
   */
  searchPatientByQRCode(id: string, name: string): Observable<any> {
    const params = new HttpParams().set('id', id).set('nom', name);
    return this.http.get(`${this.baseUrl}/search-by-qr/`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }

  /**
   * Create a patient dossier.
   * @param patientData The patient data.
   * @returns An Observable for the creation request.
   */
  createDossierPatient(patientData: Record<string, string>): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerUserPatient/`, patientData, {
      headers: this.getAuthHeaders(),
    });
  }
}
