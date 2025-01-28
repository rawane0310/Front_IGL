import { Injectable , signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIndicatorsServiceServiceService {

    
    loadingData = signal({
      isLoading: false,
      loadingMessage: 'Chargement...'
    });
  
    sucessData = signal({
      isSuccess: false,
      successMessage: 'Opération Effectué avec succès'
    })
  
    errorData = signal({
      isError: false,
      errorMessage: 'Erreur lors de l\'opération'
    })
  
    constructor() { }
  
}
