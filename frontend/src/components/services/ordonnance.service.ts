import { Injectable , signal } from '@angular/core';



export  interface Medicament {
  id: number,
  nom: string,
  dose: string,
  frequence: string,
  duree: string,
  ordonnance_id: number | null,
  soin_id: number | null
}
@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {

  constructor() { }
  medicaments = signal<Medicament[]>([])
}
