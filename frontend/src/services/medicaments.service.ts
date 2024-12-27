import { Injectable, signal } from '@angular/core';
import Medicament from '../models/Medicament';

@Injectable({
  providedIn: 'root'
})
export class MedicamentsService {
  
  medicaments = signal<Medicament[]>([])


  constructor() { }
}
