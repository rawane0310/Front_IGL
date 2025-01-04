import { Injectable, signal } from '@angular/core';
import { ExamenRadiologique } from '../models/Examen';


/**
 * Service for managing radiological exams related to a specific patient dossier (DPI).
 * 
 * This service is responsible for managing the list of radiological exams associated with a patient dossier
 * and provides methods to interact with the list. It uses signals to store and update the list of exams.
 * 
 * It allows:
 * - Storing the list of radiological exams.
 * - Managing the `dpiId` to link exams to a specific patient dossier.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class ExamensRadiologiquesService {

  /**
   * The identifier for the patient dossier (DPI) to which the radiological exams belong.
   * This value links the exams to a specific patient record.
   * 
   * @type {string}
   */
  dpiId !: string;


  /**
   * A signal that holds the list of radiological exams for the specified DPI.
   * The list is dynamically updated as needed and is accessible throughout the application.
   * 
   * @type {signal<ExamenRadiologique[]>}
   */
  examensRadiologiques = signal<ExamenRadiologique[]>([]);


  /**
   * Initializes a new instance of the `ExamensRadiologiquesService`.
   * This constructor sets up the service to manage the radiological exams related to a specific DPI (Dossier Patient Individuel).
   * It initializes the `dpiId` and the `examensRadiologiques` signal, but does not require any input parameters.
   * 
   * @constructor
   */
  constructor() { }
}
