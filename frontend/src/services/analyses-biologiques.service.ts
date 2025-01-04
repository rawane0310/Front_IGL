import { Injectable, signal } from '@angular/core';
import { AnalyseBiologique } from '../models/Examen';


/**
 * The `AnalysesBiologiquesService` is a service used to manage and store biological analysis data (Analyses Biologiques) for a specific DPI.
 * It provides access to a signal of `AnalyseBiologique` objects, and stores the `dpiId` for a specific DPI context.
 * 
 * @service
 * 
 * @property {string} dpiId - The ID of the current DPI (Dossier de Patient Informatisé), used to filter or associate biological analysis data.
 * @property {Signal<AnalyseBiologique[]>} AnalysesBiologiques - A signal that holds an array of `AnalyseBiologique` objects, representing the biological analyses related to the DPI.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalysesBiologiquesService {

   /**
   * The ID of the current DPI associated with the biological analyses.
   * 
   * @type {string}
   */
  dpiId !: string;


  /**
   * A signal representing the list of biological analyses (Analyses Biologiques) for the current DPI.
   * 
   * @type {Signal<AnalyseBiologique[]>}
   */
  AnalysesBiologiques = signal<AnalyseBiologique[]>([]);


  /**
 * Initializes a new instance of the `AnalysesBiologiquesService`.
 * This constructor sets up the service without requiring any additional configuration or parameters.
 * It allows the service to be injected and used throughout the application, particularly for managing biological analysis data related to a DPI.
 * 
 * @constructor
 */
  constructor() { }
}
