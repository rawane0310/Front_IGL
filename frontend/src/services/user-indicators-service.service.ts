import { Injectable, signal } from '@angular/core';


/**
 * Service for managing user indicators (loading, success, and error messages).
 * 
 * This service provides signals to track and update the state of user feedback indicators,
 * such as loading status, success messages, and error messages. It can be used throughout
 * the application to inform the user about ongoing operations and their outcomes.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class UserIndicatorsServiceService {
  
   /**
   * Signal for managing loading state and message.
   * 
   * This signal tracks whether a process is loading and allows setting a custom loading message.
   * The default message is "Chargement..." (Loading...).
   * 
   * @type {Signal<{isLoading: boolean, loadingMessage: string}>}
   * @default { isLoading: false, loadingMessage: 'Chargement...' }
   */
  loadingData = signal({
    isLoading: false,
    loadingMessage: 'Chargement...'
  });


  /**
   * Signal for managing success state and message.
   * 
   * This signal tracks whether an operation was successful and allows setting a custom success message.
   * The default message is "Opération Effectué avec succès" (Operation completed successfully).
   * 
   * @type {Signal<{isSuccess: boolean, successMessage: string}>}
   * @default { isSuccess: false, successMessage: 'Opération Effectué avec succès' }
   */
  sucessData = signal({
    isSuccess: false,
    successMessage: 'Opération Effectué avec succès'
  })


  /**
   * Signal for managing error state and message.
   * 
   * This signal tracks whether an operation encountered an error and allows setting a custom error message.
   * The default message is "Erreur lors de l'opération" (Error during operation).
   * 
   * @type {Signal<{isError: boolean, errorMessage: string}>}
   * @default { isError: false, errorMessage: 'Erreur lors de l\'opération' }
   */
  errorData = signal({
    isError: false,
    errorMessage: 'Erreur lors de l\'opération'
  })


  /**
   * Initializes the UserIndicatorsServiceService.
   * 
   * The constructor does not take any parameters and initializes the signals with their default values.
   * 
   * @constructor
   */
  constructor() { }
}
