import { Injectable, signal } from '@angular/core';
import Medicament from '../models/Medicament';


/**
 * Service for managing medicaments.
 * 
 * This service is responsible for managing a list of medicaments. It allows for storing, updating,
 * and accessing the list of medicaments. The list is stored as a signal, which allows for dynamic updates
 * and easy tracking of changes.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class MedicamentsService {
  

  /**
   * A signal that holds the list of medicaments.
   * The list is dynamically updated as needed and can be accessed throughout the application.
   * 
   * @type {signal<Medicament[]>}
   */
  medicaments = signal<Medicament[]>([])



  /**
   * Initializes a new instance of the `MedicamentsService`.
   * This constructor sets up the service to manage the list of medicaments.
   * It initializes the `medicaments` signal, which will hold the list of medicaments.
   * 
   * @constructor
   */
  constructor() { }
}
