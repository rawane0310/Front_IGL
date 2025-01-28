
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, signal } from '@angular/core';
export default interface Consultation  {
  id: number ,
  date: string,
  medecin: number,
  diagnosticStatut: boolean,
  resume: number,
  ordonnance: number,
  dossier: number
}
@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  dpiId !: string;
  consultations = signal<Consultation[]>([]);

  
}
