import { Injectable, signal } from '@angular/core';
import { ResultatAnalyse } from '../models/Examen';


/**
 * Service for managing the results of medical analyses.
 * 
 * This service manages a list of medical analysis results. The results are stored in a signal,
 * allowing for dynamic updates and tracking of changes to the result list in real-time.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class ResultatAnalyseService {


  /**
   * A signal that holds the list of medical analysis results.
   * The list is dynamically updated and can be accessed across the application.
   * 
   * @type {signal<ResultatAnalyse[]>}
   */
  resultatsAnalyse = signal<ResultatAnalyse[]>([])


  /**
   * Initializes the `ResultatAnalyseService` instance.
   * This constructor sets up the service to manage the list of medical analysis results.
   * It initializes the `resultatsAnalyse` signal, which will store the analysis results.
   * 
   * @constructor
   */
  constructor() { }
}
