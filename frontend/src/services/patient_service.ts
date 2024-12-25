import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'http://localhost:8000/dpi';

  constructor(private http: HttpClient) { }

  /**
   * Search for a patient by NSS.
   * @param nss The NSS of the patient.
   * @returns An Observable containing the patient and dossier data.
   */
  searchPatientByNSS(nss: string): Observable<any> {
    const params = new HttpParams().set('nss', nss);
    return this.http.get(`${this.baseUrl}/search_by_nss/`, { params });
  }

  /**
   * Search for a patient by QR code (id and name).
   * @param id The patient's ID.
   * @param name The patient's name.
   * @returns An Observable containing the patient and dossier data.
   */
  searchPatientByQRCode(id: string, name: string): Observable<any> {
    const params = new HttpParams().set('id', id).set('nom', name);
    return this.http.get(`${this.baseUrl}/search-by-qr/`, { params });
  }
}
