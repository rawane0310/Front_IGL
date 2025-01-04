import { Injectable, signal } from '@angular/core';
import SoinInfermier from '../models/SoinInfermier';


/**
 * Service for managing nurse care (Soins Infirmiers).
 * 
 * This service handles the list of nurse care records (`SoinInfermier`) for a specific dossier or patient.
 * The list is stored in a signal, which allows real-time updates to the collection of care records.
 * It also manages the `dpiId`, which represents the dossier ID of the patient for whom the care is being tracked.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class SoinsInfermiersService {


  /**
   * The dossier ID for the patient whose care records are being managed.
   * This ID links to a specific patient and is used for fetching or updating care records.
   * 
   * @type {string}
   * @example '12345'
   */
  dpiId !: string;


   /**
   * A signal that holds the list of nurse care records.
   * The list is updated dynamically, providing an efficient way to track and modify care records.
   * 
   * @type {signal<SoinInfermier[]>}
   */
  soinsInfermiers = signal<SoinInfermier[]>([]);


  /**
   * Initializes the `SoinsInfermiersService` instance.
   * This constructor sets up the service to manage the nurse care records and initialize the related signal.
   * 
   * @constructor
   */
  constructor() { }
}
