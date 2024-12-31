import { Injectable, signal } from '@angular/core';
import { ResultatAnalyse } from '../models/Examen';

@Injectable({
  providedIn: 'root'
})
export class ResultatAnalyseService {

  resultatsAnalyse = signal<ResultatAnalyse[]>([])

  constructor() { }
}
