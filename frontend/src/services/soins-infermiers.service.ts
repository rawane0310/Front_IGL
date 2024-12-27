import { Injectable, signal } from '@angular/core';
import SoinInfermier from '../models/SoinInfermier';

@Injectable({
  providedIn: 'root'
})
export class SoinsInfermiersService {
  dpiId !: string;
  soinsInfermiers = signal<SoinInfermier[]>([]);

  

  constructor() { }
}
