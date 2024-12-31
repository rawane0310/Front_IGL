import { Injectable, signal } from '@angular/core';
import { ExamenRadiologique } from '../models/Examen';

@Injectable({
  providedIn: 'root'
})
export class ExamensRadiologiquesService {
  dpiId !: string;
  examensRadiologiques = signal<ExamenRadiologique[]>([]);

  constructor() { }
}
