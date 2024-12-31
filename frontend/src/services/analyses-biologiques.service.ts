import { Injectable, signal } from '@angular/core';
import { AnalyseBiologique } from '../models/Examen';

@Injectable({
  providedIn: 'root'
})
export class AnalysesBiologiquesService {
  dpiId !: string;
  AnalysesBiologiques = signal<AnalyseBiologique[]>([]);

  constructor() { }
}
